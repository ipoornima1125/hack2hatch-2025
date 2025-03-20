"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"
import { Briefcase, GraduationCap } from "lucide-react"

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
    <Card className="p-8 group relative bg-gradient-to-br from-white to-gray-50">
      <EditButton onClick={() => setIsEditing(true)} />

      <div className="flex flex-col md:flex-row items-center gap-8">
        <Avatar className="w-40 h-40 border-4 border-white shadow-lg shrink-0">
          <AvatarImage src={avatarUrl} alt={profileData.fullName} />
          <AvatarFallback className="text-3xl bg-gradient-to-br from-green-100 to-green-200 text-green-700">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{profileData.fullName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <p className="text-lg">{profileData.industry}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
              <GraduationCap className="w-4 h-4" />
              <span>Skills & Expertise</span>
            </div>
            <div className="flex items-center flex-wrap gap-2 justify-center md:justify-start">
              {skillsArray.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1 bg-white border-2 border-green-500 text-green-700 hover:bg-green-50 transition-colors duration-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
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
            label: "Skills (comma-separated)",
            type: "text",
            value: profileData.skills,
          },
        ]}
      />
    </Card>
  )
}

