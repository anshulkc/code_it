"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { TutorialStep } from "@/components/tutorial-step"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { getTutorialData } from "@/lib/tutorial-data"
import { generateTutorialFromPrompt } from "@/lib/tutorial-generator"
import type { Tutorial } from "@/types/tutorial"

export default function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTutorial = async () => {
      try {
        let data: Tutorial

        if (projectId.startsWith("custom-")) {
          // For custom projects, we would typically retrieve the prompt from storage
          // and generate a tutorial based on it
          // For demo purposes, we'll use a placeholder prompt
          const prompt = localStorage.getItem(`prompt-${projectId}`) || "Create a custom project"
          data = await generateTutorialFromPrompt(prompt)
        } else {
          // For predefined projects, load from our tutorial data
          data = await getTutorialData(projectId)
        }

        setTutorial(data)
      } catch (error) {
        console.error("Failed to load tutorial:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTutorial()
  }, [projectId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
        <p className="mb-6">We couldn't find the tutorial you're looking for.</p>
        <Link href="/">
          <Button>
            <Home className="mr-2 h-4 w-4" /> Return Home
          </Button>
        </Link>
      </div>
    )
  }

  const currentStep = tutorial.steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === tutorial.steps.length - 1

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white">{tutorial.title}</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Step {currentStepIndex + 1} of {tutorial.steps.length}
          </div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{currentStep.title}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <TutorialStep step={currentStep} />
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={handlePrevStep} disabled={isFirstStep} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNextStep} disabled={isLastStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

