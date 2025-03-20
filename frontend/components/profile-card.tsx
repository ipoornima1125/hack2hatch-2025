"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"

interface ProfileCardProps {
  fullName?: string
  industry?: string
  skills?: string[]
  avatarUrl?: string
}

export function ProfileCard({
  fullName = "Jane Doe",
  industry = "Software Development",
  skills = ["React", "TypeScript", "UI/UX"],
  avatarUrl,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName,
    industry,
    skills: skills.join(", "),
  })

  // Generate initials for avatar fallback
  const initials = profileData.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  const handleSave = (data: { fullName: string; industry: string; skills: string }) => {
    setProfileData({
      ...data,
      skills: data.skills,
    })
    // In a real app, you would save this to the database
  }

  const skillsArray = profileData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)

  return (
    <Card className="p-6 flex justify-center items-center group relative">
      <EditButton onClick={() => setIsEditing(true)} />

      <div className="flex md:flex-row items-center md:items-start gap-6 mb-6">
        <Avatar className="w-32 h-32 border-2 border-border shrink-0">
          <AvatarImage src={avatarUrl} alt={profileData.fullName} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="text-center flex-col items-center md:text-left">
          <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
          <p className="text-xl font-medium text-red-500">{profileData.industry}</p>

          <div className="flex items-center flex-wrap gap-2 justify-center md:justify-start mt-4">
            {skillsArray.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-green-500 text-green-600 bg-white hover:bg-green-50"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <EditModal
        title="Edit Profile"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        fields={[
          {
            id: "fullName",
            label: "Full Name",
            type: "text",
            value: profileData.fullName,
          },
          {
            id: "industry",
            label: "Industry",
            type: "text",
            value: profileData.industry,
          },
          {
            id: "skills",
            label: "Skills",
            type: "text",
            value: profileData.skills,
          },
        ]}
      />
    </Card>
  )
}

