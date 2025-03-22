"use client"
import { Card, CardContent } from "./ui/card"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Badge } from "./ui/badge"

const accountTypes = [
  {
    id: "mentor",
    name: "Mentor",
    description: "Share your expertise and guide others",
    fields: ["industry", "skills", "education", "certifications", "availability", "packages", "bio"],
  },
  {
    id: "innovator",
    name: "Innovator",
    description: "Showcase your innovative ideas and projects",
    fields: ["industry", "skills", "education", "certifications", "innovation", "lookingFor", "bio"],
  },
  {
    id: "technical",
    name: "Technical Person",
    description: "Highlight your technical skills and portfolio",
    fields: ["industry", "skills", "education", "certifications", "portfolio", "lookingFor", "bio"],
  },
  {
    id: "investor",
    name: "Investor",
    description: "Connect with promising projects and entrepreneurs",
    fields: ["industry", "lookingFor", "bio"],
  },
  {
    id: "community",
    name: "Community",
    description: "Build and manage communities around shared interests",
    fields: ["industry", "bio"],
  },
]

interface AccountTypeSelectorProps {
  selectedType: string
  onSelect: (type: string) => void
}

export default function AccountTypeSelector({ selectedType, onSelect }: AccountTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Select Account Type</h2>
        {selectedType && (
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {accountTypes.find((type) => type.id === selectedType)?.name}
          </Badge>
        )}
      </div>

      <RadioGroup value={selectedType} onValueChange={onSelect} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accountTypes.map((type) => (
          <Card
            key={type.id}
            className={`overflow-hidden transition-all hover:shadow-md ${
              selectedType === type.id ? "border-primary ring-1 ring-primary" : ""
            }`}
          >
            <CardContent className="p-0">
              <label htmlFor={type.id} className="flex items-start p-4 cursor-pointer gap-4">
                <RadioGroupItem id={type.id} value={type.id} className="mt-1" />
                <div className="space-y-1">
                  <p className="font-medium">{type.name}</p>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </label>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  )
}

