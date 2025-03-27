import type { CodeChunk, CodeValidationResult } from "@/types/tutorial"

// In a real application, this would likely be a server-side function
// or use a more sophisticated approach for code validation
export async function checkCodeSolution(userCode: string, codeChunk: CodeChunk): Promise<CodeValidationResult> {
  // Simulate API call or processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is a very simplified validation
      // In a real app, you would use a more sophisticated approach

      // For demo purposes, we'll just check if the code contains certain keywords
      const expectedKeywords = getExpectedKeywords(codeChunk)
      const missingKeywords = expectedKeywords.filter((keyword) => !userCode.includes(keyword))

      if (missingKeywords.length === 0) {
        resolve({
          isCorrect: true,
          message: "Great job! Your solution looks correct.",
        })
      } else {
        resolve({
          isCorrect: false,
          message: `Your solution is missing some important elements.`,
          solution: codeChunk.expectedSolution,
          explanation: `Your code is missing: ${missingKeywords.join(", ")}. Make sure you've implemented all the required functionality.`,
        })
      }
    }, 1000)
  })
}

// Helper function to extract expected keywords from a code chunk
function getExpectedKeywords(codeChunk: CodeChunk): string[] {
  // This is a simplified approach
  // In a real app, you would use a more sophisticated approach

  switch (codeChunk.id) {
    case "todo-component":
      return ["checkbox", "todo.text", "todo.completed", "onDelete", "onToggle"]
    case "todolist-component":
      return ["todos.map", "Todo", "key={todo.id}", "onToggle", "onDelete"]
    default:
      return []
  }
}

