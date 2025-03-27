"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, FileCode, Globe, Server } from "lucide-react"
import Link from "next/link"

type Project = {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  icon: React.ReactNode
}

const PROJECTS: Project[] = [
  {
    id: "todo-app",
    title: "Todo App",
    description: "Build a simple todo application with React",
    difficulty: "Beginner",
    icon: <FileCode className="h-8 w-8 text-blue-500" />,
  },
  {
    id: "weather-app",
    title: "Weather App",
    description: "Create a weather app that fetches data from an API",
    difficulty: "Intermediate",
    icon: <Globe className="h-8 w-8 text-green-500" />,
  },
  {
    id: "blog-api",
    title: "Blog API",
    description: "Develop a RESTful API for a blog using Node.js",
    difficulty: "Advanced",
    icon: <Server className="h-8 w-8 text-purple-500" />,
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Build your own portfolio website with Next.js",
    difficulty: "Intermediate",
    icon: <Code className="h-8 w-8 text-orange-500" />,
  },
]

export function ProjectSelection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProjects = selectedCategory
    ? PROJECTS.filter((project) => project.difficulty === selectedCategory)
    : PROJECTS

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={selectedCategory === null ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
          All
        </Button>
        <Button
          variant={selectedCategory === "Beginner" ? "default" : "outline"}
          onClick={() => setSelectedCategory("Beginner")}
        >
          Beginner
        </Button>
        <Button
          variant={selectedCategory === "Intermediate" ? "default" : "outline"}
          onClick={() => setSelectedCategory("Intermediate")}
        >
          Intermediate
        </Button>
        <Button
          variant={selectedCategory === "Advanced" ? "default" : "outline"}
          onClick={() => setSelectedCategory("Advanced")}
        >
          Advanced
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {project.icon}
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">Difficulty: {project.difficulty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">{project.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/tutorial/${project.id}`} className="w-full">
                <Button className="w-full">
                  Start Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

