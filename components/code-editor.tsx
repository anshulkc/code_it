"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
}

export function CodeEditor({ value, onChange, language = "javascript" }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  // This is a simplified code editor component
  // In a production app, you would use a library like Monaco Editor or CodeMirror
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-60 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse" />
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
        {language}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono text-sm min-h-[200px] resize-y p-4 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
        placeholder={`Write your ${language} code here...`}
        spellCheck={false}
      />
    </div>
  )
}

