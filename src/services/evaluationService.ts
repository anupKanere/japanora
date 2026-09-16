import type { Exercise, EvaluationResult } from '@/types'

/**
 * evaluationService — answer evaluation abstraction.
 *
 * Current implementation: rule-based matching.
 * Future: swap evaluateProduction() to call an AI API
 * by implementing the same interface.
 */

function normalize(str: string): string {
  return str
    .trim()
    .toLowerCase()
    // Remove punctuation (Japanese and ASCII)
    .replace(/[。、！？,.!?「」『』（）()]/g, '')
    // Normalize spaces
    .replace(/\s+/g, ' ')
    // Convert romaji particles that learners commonly type
    .replace(/\bwa\b/g, 'は')
    .replace(/\bwo\b/g, 'を')
    .replace(/\bni\b/g, 'に')
    .replace(/\bde\b/g, 'で')
    .replace(/\bga\b/g, 'が')
    .replace(/\bno\b/g, 'の')
    .trim()
}

function objectiveEvaluate(
  userAnswer: string,
  correctAnswer: string | string[],
  alternativeAnswers?: string[]
): boolean {
  const normalizedUser = normalize(userAnswer)
  const allCorrect = Array.isArray(correctAnswer)
    ? correctAnswer
    : [correctAnswer, ...(alternativeAnswers ?? [])]
  return allCorrect.some((c) => normalize(c) === normalizedUser)
}

export const evaluationService = {
  /**
   * Main entry point — evaluates any exercise type.
   */
  evaluate(exercise: Exercise, userAnswer: string): EvaluationResult {
    switch (exercise.type) {
      case 'multipleChoice':
      case 'fillBlank':
      case 'particleSelect':
        return this.evaluateObjective(exercise, userAnswer)

      case 'translation':
      case 'reading':
        return this.evaluateTranslation(exercise, userAnswer)

      case 'sentenceOrder':
        return this.evaluateSentenceOrder(exercise, userAnswer)

      case 'sentenceProduction':
        return this.evaluateProduction(exercise, userAnswer)

      default:
        return {
          isCorrect: false,
          score: 0,
          feedback: 'Unknown exercise type.',
          mistakeCategories: [],
        }
    }
  },

  evaluateObjective(exercise: Exercise, userAnswer: string): EvaluationResult {
    const isCorrect = objectiveEvaluate(
      userAnswer,
      exercise.correctAnswer,
      exercise.alternativeAnswers
    )
    return {
      isCorrect,
      score: isCorrect ? 1 : 0,
      feedback: isCorrect
        ? 'Correct! 正解です！'
        : `Not quite. The correct answer is: ${Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[0] : exercise.correctAnswer}`,
      mistakeCategories: isCorrect ? [] : exercise.mistakeCategory ? [exercise.mistakeCategory] : [],
      correctedAnswer: isCorrect
        ? undefined
        : Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer[0]
          : exercise.correctAnswer,
      explanation: exercise.explanation,
    }
  },

  evaluateTranslation(exercise: Exercise, userAnswer: string): EvaluationResult {
    const isCorrect = objectiveEvaluate(
      userAnswer,
      exercise.correctAnswer,
      exercise.alternativeAnswers
    )

    // Partial credit: check if key vocabulary is present
    const correctStr = Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer[0]
      : exercise.correctAnswer
    const keywords = correctStr.split(/\s+/).filter((w) => w.length > 1)
    const matchedKeywords = keywords.filter((kw) => normalize(userAnswer).includes(normalize(kw)))
    const partialScore = matchedKeywords.length / keywords.length

    return {
      isCorrect,
      isPartiallyCorrect: !isCorrect && partialScore > 0.5,
      score: isCorrect ? 1 : partialScore,
      feedback: isCorrect
        ? '正解です！Great translation!'
        : partialScore > 0.5
          ? 'Close! Check the particles and word order carefully.'
          : `Not quite right. Expected: ${correctStr}`,
      mistakeCategories: isCorrect ? [] : exercise.mistakeCategory ? [exercise.mistakeCategory] : [],
      correctedAnswer: isCorrect ? undefined : correctStr,
      explanation: exercise.explanation,
    }
  },

  evaluateSentenceOrder(exercise: Exercise, userAnswer: string): EvaluationResult {
    const isCorrect = objectiveEvaluate(
      userAnswer,
      exercise.correctAnswer,
      exercise.alternativeAnswers
    )
    return {
      isCorrect,
      score: isCorrect ? 1 : 0,
      feedback: isCorrect
        ? '正解です！The sentence order is correct!'
        : 'The word order isn\'t quite right. Remember: the verb goes last!',
      mistakeCategories: isCorrect ? [] : ['wordOrder'],
      correctedAnswer: isCorrect
        ? undefined
        : Array.isArray(exercise.correctAnswer)
          ? exercise.correctAnswer[0]
          : exercise.correctAnswer,
      explanation: exercise.explanation,
    }
  },

  /**
   * Production evaluation — AI-ready interface.
   * Currently performs basic keyword / pattern checks.
   * Replace the body of this method with an API call in the future.
   */
  evaluateProduction(exercise: Exercise, userAnswer: string): EvaluationResult {
    if (!userAnswer.trim()) {
      return {
        isCorrect: false,
        score: 0,
        feedback: 'Please write a sentence before submitting.',
        mistakeCategories: [],
      }
    }

    const hasVerb = /ます|ません|ました|です/.test(userAnswer)
    const hasObject = /を/.test(userAnswer) || /o /.test(userAnswer.toLowerCase())
    const hasTopic = /は|wa /.test(userAnswer)
    const isHiragana = /[ぁ-ん]/.test(userAnswer)

    let score = 0.5
    const tips: string[] = []

    if (hasVerb) {
      score += 0.2
    } else {
      tips.push('Make sure your sentence ends with a ます-form verb.')
    }
    if (hasObject) score += 0.15
    if (hasTopic) score += 0.1
    if (isHiragana) score += 0.05

    score = Math.min(score, 1)

    return {
      isCorrect: score >= 0.8,
      isPartiallyCorrect: score >= 0.5 && score < 0.8,
      score,
      feedback:
        score >= 0.8
          ? 'Great sentence! Check the tips below to polish further.'
          : tips.length > 0
            ? tips.join(' ')
            : 'Good attempt! Keep practising.',
      mistakeCategories: hasVerb ? [] : ['verbConjugation'],
      explanation: exercise.explanation,
    }
  },
}
