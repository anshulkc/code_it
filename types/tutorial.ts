export interface Tutorial {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  steps: Step[]
}

export interface Step {
  id: string
  title: string
  description: string
  codeChunks?: CodeChunk[]
}

export interface CodeChunk {
  id: string
  fileName: string
  language: string
  instructions: string
  initialCode: string
  expectedSolution: string
  hints?: string[]
}

export interface CodeValidationResult {
  isCorrect: boolean
  message: string
  solution?: string
  explanation?: string
}

