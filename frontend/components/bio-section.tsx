"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"

interface BioSectionProps {
  bio?: string
  education?: { institution: string; degree: string; year: string }[]
  certifications?: { name: string; issuer: string; year: string }[]
}

export function BioSection({
  bio = "Experienced professional with a passion for creating intuitive user experiences.",
  education = [],
  certifications = [],
}: BioSectionProps) {
  const [editingBio, setEditingBio] = useState(false)
  const [editingEducation, setEditingEducation] = useState<number | null>(null)
  const [editingCertification, setEditingCertification] = useState<number | null>(null)
  const [bioData, setBioData] = useState(bio)
  const [educationData, setEducationData] = useState(education)
  const [certificationsData, setCertificationsData] = useState(certifications)

  const handleBioSave = (data: { bio: string }) => {
    setBioData(data.bio)
    // In a real app, you would save this to the database
  }

  const handleEducationSave = (index: number, data: { institution: string; degree: string; year: string }) => {
    const newEducation = [...educationData]
    newEducation[index] = data
    setEducationData(newEducation)
    // In a real app, you would save this to the database
  }

  const handleCertificationSave = (index: number, data: { name: string; issuer: string; year: string }) => {
    const newCertifications = [...certificationsData]
    newCertifications[index] = data
    setCertificationsData(newCertifications)
    // In a real app, you would save this to the database
  }

  return (
    <div className="space-y-6">
      <Card className="group relative">
        <EditButton onClick={() => setEditingBio(true)} />
        <CardHeader>
          <CardTitle>Biography</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{bioData}</p>
        </CardContent>

        <EditModal
          title="Edit Bio"
          isOpen={editingBio}
          onClose={() => setEditingBio(false)}
          onSave={handleBioSave}
          fields={[
            {
              id: "bio",
              label: "Bio",
              type: "textarea",
              value: bioData,
            },
          ]}
        />
      </Card>

      <Card className="group relative">
        <EditButton onClick={() => setEditingEducation(educationData.length > 0 ? 0 : null)} />
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {educationData.length === 0 ? (
            <p className="text-muted-foreground italic">No education listed</p>
          ) : (
            <div className="space-y-4">
              {educationData.map((edu, index) => (
                <div key={index} className="group/item relative">
                  <EditButton
                    onClick={() => setEditingEducation(index)}
                    className="right-0 top-0 group-hover/item:opacity-100"
                  />
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}, {edu.year}
                  </p>

                  {editingEducation === index && (
                    <EditModal
                      title="Edit Education"
                      isOpen={true}
                      onClose={() => setEditingEducation(null)}
                      onSave={(data) => handleEducationSave(index, data)}
                      fields={[
                        {
                          id: "institution",
                          label: "Institution",
                          type: "text",
                          value: edu.institution,
                        },
                        {
                          id: "degree",
                          label: "Degree",
                          type: "text",
                          value: edu.degree,
                        },
                        {
                          id: "year",
                          label: "Year",
                          type: "text",
                          value: edu.year,
                        },
                      ]}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="group relative">
        <EditButton onClick={() => setEditingCertification(certificationsData.length > 0 ? 0 : null)} />
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          {certificationsData.length === 0 ? (
            <p className="text-muted-foreground italic">No certifications listed</p>
          ) : (
            <div className="space-y-4">
              {certificationsData.map((cert, index) => (
                <div key={index} className="group/item relative">
                  <EditButton
                    onClick={() => setEditingCertification(index)}
                    className="right-0 top-0 group-hover/item:opacity-100"
                  />
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}, {cert.year}
                  </p>

                  {editingCertification === index && (
                    <EditModal
                      title="Edit Certification"
                      isOpen={true}
                      onClose={() => setEditingCertification(null)}
                      onSave={(data) => handleCertificationSave(index, data)}
                      fields={[
                        {
                          id: "name",
                          label: "Name",
                          type: "text",
                          value: cert.name,
                        },
                        {
                          id: "issuer",
                          label: "Issuer",
                          type: "text",
                          value: cert.issuer,
                        },
                        {
                          id: "year",
                          label: "Year",
                          type: "text",
                          value: cert.year,
                        },
                      ]}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

