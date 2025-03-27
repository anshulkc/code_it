import { ProjectPrompt } from "@/components/project-prompt"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-2 text-slate-900 dark:text-white">CodeTutor</h1>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-12">
          Learn to code with interactive tutorials and AI-powered feedback
        </p>
        <ProjectPrompt />
      </div>
    </main>
  )
}

