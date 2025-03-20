"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"

interface InfoSectionProps {
  items: { title: string; content: string }[]
}

export function InfoSection({ items }: InfoSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [infoItems, setInfoItems] = useState(items)

  const handleSave = (index: number, data: { title: string; content: string }) => {
    const newItems = [...infoItems]
    newItems[index] = data
    setInfoItems(newItems)
    // In a real app, you would save this to the database
  }

  return (
    <Card className="group relative">
      <CardContent className="pt-6">
        {infoItems.map((item, index) => (
          <div key={index} className="mb-6 last:mb-0 group/item relative">
            <EditButton onClick={() => setEditingIndex(index)} className="right-0 top-0 group-hover/item:opacity-100" />
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p>{item.content}</p>

            {editingIndex === index && (
              <EditModal
                title={`Edit ${item.title}`}
                isOpen={true}
                onClose={() => setEditingIndex(null)}
                onSave={(data) => handleSave(index, data)}
                fields={[
                  {
                    id: "title",
                    label: "Title",
                    type: "text",
                    value: item.title,
                  },
                  {
                    id: "content",
                    label: "Content",
                    type: "textarea",
                    value: item.content,
                  },
                ]}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

