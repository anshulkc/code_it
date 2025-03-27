"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export function ProjectPrompt() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setError("Please describe the project you want to build")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, this would call an API to process the prompt
      // and generate a tutorial based on the natural language description
      const projectId = await processProjectPrompt(prompt)
      router.push(`/tutorial/${projectId}`)
    } catch (err) {
      setError("Sorry, we couldn't process your request. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // This function would typically call an API to process the prompt
  // For demo purposes, we're using a simplified implementation
  const processProjectPrompt = async (promptText: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple keyword matching for demo purposes
        const promptLower = promptText.toLowerCase()

        if (promptLower.includes("todo") || promptLower.includes("task")) {
          resolve("todo-app")
        } else if (promptLower.includes("weather") || promptLower.includes("forecast")) {
          resolve("weather-app")
        } else if (promptLower.includes("blog") || promptLower.includes("cms")) {
          resolve("blog-api")
        } else if (promptLower.includes("portfolio") || promptLower.includes("personal website")) {
          resolve("portfolio")
        } else {
          // Default to a generic project if no keywords match
          resolve("custom-project")
        }
      }, 1500)
    })
  }

  const examplePrompts = [
    "I want to build a todo app with React",
    "Help me create a weather application that shows forecasts",
    "I need a portfolio website to showcase my work",
    "Show me how to build a blog with a CMS",
  ]

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">What would you like to build?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Textarea
              placeholder="Describe the project you want to build in VSCode..."
              className="min-h-[120px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Try one of these examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading || !prompt.trim()}>
          {isLoading ? (
            <>
              Processing<span className="loading-dots">...</span>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Tutorial
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

