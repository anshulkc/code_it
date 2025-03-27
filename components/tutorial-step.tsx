"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "@/components/code-editor"
import { CheckCircle, AlertCircle } from "lucide-react"
import type { Step } from "@/types/tutorial"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { checkCodeSolution } from "@/lib/code-validator"

export function TutorialStep({ step }: { step: Step }) {
  const [codeChunks, setCodeChunks] = useState<Record<string, string>>(
    step.codeChunks?.reduce((acc, chunk) => {
      return { ...acc, [chunk.id]: chunk.initialCode }
    }, {}) || {},
  )

  const [feedback, setFeedback] = useState<
    Record<
      string,
      {
        isCorrect: boolean
        message: string
        solution?: string
        explanation?: string
      }
    >
  >({})

  const handleCodeChange = (chunkId: string, newCode: string) => {
    setCodeChunks((prev) => ({
      ...prev,
      [chunkId]: newCode,
    }))
  }

  const handleCheckSolution = async (chunkId: string) => {
    const chunk = step.codeChunks?.find((c) => c.id === chunkId)
    if (!chunk) return

    const code = codeChunks[chunkId]

    try {
      const result = await checkCodeSolution(code, chunk)

      setFeedback((prev) => ({
        ...prev,
        [chunkId]: {
          isCorrect: result.isCorrect,
          message: result.message,
          solution: result.solution,
          explanation: result.explanation,
        },
      }))
    } catch (error) {
      console.error("Error checking solution:", error)
      setFeedback((prev) => ({
        ...prev,
        [chunkId]: {
          isCorrect: false,
          message: "An error occurred while checking your solution.",
        },
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold mb-4">{step.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: step.description }} />
      </div>

      {step.codeChunks?.map((chunk) => (
        <div key={chunk.id} className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{chunk.fileName}</span>
              <Button size="sm" onClick={() => handleCheckSolution(chunk.id)}>
                Check Solution
              </Button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900">
            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{chunk.instructions}</p>
            </div>

            <CodeEditor
              value={codeChunks[chunk.id] || ""}
              onChange={(value) => handleCodeChange(chunk.id, value)}
              language={chunk.language || "javascript"}
            />

            {feedback[chunk.id] && (
              <div className="mt-4">
                <Alert variant={feedback[chunk.id].isCorrect ? "default" : "destructive"}>
                  <div className="flex items-start">
                    {feedback[chunk.id].isCorrect ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    <div>
                      <AlertTitle>{feedback[chunk.id].isCorrect ? "Correct!" : "Not quite right"}</AlertTitle>
                      <AlertDescription>
                        {feedback[chunk.id].message}

                        {!feedback[chunk.id].isCorrect && feedback[chunk.id].solution && (
                          <div className="mt-4">
                            <p className="font-medium mb-2">Suggested solution:</p>
                            <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm overflow-x-auto">
                              {feedback[chunk.id].solution}
                            </pre>
                            {feedback[chunk.id].explanation && (
                              <div className="mt-2 text-sm">
                                <p className="font-medium mb-1">Explanation:</p>
                                <p>{feedback[chunk.id].explanation}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

