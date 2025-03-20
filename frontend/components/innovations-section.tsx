"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"

interface Innovation {
  id: string
  title: string
  description: string
  status: string
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
}

interface InnovationsSectionProps {
  innovations?: Innovation[]
}

const defaultInnovation: Innovation = {
  id: "",
  title: "New Innovation",
  description: "Description of your innovation/project",
  status: "In Progress",
  technologies: [],
  projectUrl: "",
  githubUrl: ""
}

export function InnovationsSection({ innovations = [] }: InnovationsSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [innovationsData, setInnovationsData] = useState(innovations)

  const handleAddInnovation = () => {
    setInnovationsData([
      ...innovationsData,
      {
        ...defaultInnovation,
        id: `innovation-${innovationsData.length + 1}`
      }
    ])
    setEditingIndex(innovationsData.length)
  }

  const handleSave = (index: number, data: Partial<Innovation>) => {
    const newInnovations = [...innovationsData]
    newInnovations[index] = {
      ...newInnovations[index],
      ...data,
      technologies: data.technologies?.toString().split(',').map(tech => tech.trim()) || []
    }
    setInnovationsData(newInnovations)
    setEditingIndex(null)
  }

  const handleDelete = (index: number) => {
    const newInnovations = [...innovationsData]
    newInnovations.splice(index, 1)
    setInnovationsData(newInnovations)
    setEditingIndex(null)
  }

  return (
    <Card className="group relative shadow-md">
      <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b">
        <CardTitle className="text-2xl font-bold">Innovations</CardTitle>
        <Button
          onClick={handleAddInnovation}
          variant="outline"
          className="text-green-600 border-green-500 hover:bg-green-50"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Innovation
        </Button>
      </div>
      <CardContent className="pt-6">
        {innovationsData.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No projects yet. Click "Add Project" to create your first project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {innovationsData.map((innovation, index) => (
              <Card key={innovation.id} className="relative group/item border border-gray-200 hover:border-green-500 transition-colors">
                <EditButton
                  onClick={() => setEditingIndex(index)}
                  className="absolute right-2 top-2 opacity-0 group-hover/item:opacity-100"
                />
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{innovation.title}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      innovation.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                      innovation.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                      innovation.status === "Completed" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {innovation.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-gray-600">{innovation.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {innovation.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {innovation.projectUrl && (
                      <a
                        href={innovation.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                    {innovation.githubUrl && (
                      <a
                        href={innovation.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:underline"
                      >
                        GitHub Repository
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {editingIndex !== null && (
        <EditModal
          title={innovationsData[editingIndex]?.title || "Add Project"}
          isOpen={true}
          onClose={() => setEditingIndex(null)}
          onSave={(data) => handleSave(editingIndex, data)}
          fields={[
            {
              id: "title",
              label: "Title",
              type: "text",
              value: innovationsData[editingIndex]?.title || "",
            },
            {
              id: "description",
              label: "Description",
              type: "textarea",
              value: innovationsData[editingIndex]?.description || "",
            },
            {
              id: "status",
              label: "Status",
              type: "text",
              value: innovationsData[editingIndex]?.status || "",
            },
            {
              id: "technologies",
              label: "Technologies (comma-separated)",
              type: "text",
              value: innovationsData[editingIndex]?.technologies.join(", ") || "",
            },
            {
              id: "projectUrl",
              label: "Project URL",
              type: "text",
              value: innovationsData[editingIndex]?.projectUrl || "",
            },
            {
              id: "githubUrl",
              label: "GitHub URL",
              type: "text",
              value: innovationsData[editingIndex]?.githubUrl || "",
            },
          ]}
          extraButtons={
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(editingIndex)}
              className="mr-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </Button>
          }
        />
      )}
    </Card>
  )
} 