"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"
import { Button } from "@/components/ui/button"

interface BioSectionProps {
  bio?: string
  education?: { 
    institution: string
    degree: string
    startDate: string
    endDate: string 
  }[]
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

  const handleAddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      startDate: "",
      endDate: ""
    }
    setEducationData([...educationData, newEducation])
    setEditingEducation(educationData.length) // Set editing mode for new entry
  }

  const handleEducationSave = (index: number, data: { 
    institution: string
    degree: string
    startDate: string
    endDate: string 
  }) => {
    const newEducation = [...educationData]
    newEducation[index] = data
    setEducationData(newEducation)
    // In a real app, you would save this to the database
  }

  const handleAddCertification = () => {
    const newCertification = {
      name: "",
      issuer: "",
      year: ""
    }
    setCertificationsData([...certificationsData, newCertification])
    setEditingCertification(certificationsData.length) // Set editing mode for new entry
  }

  const handleCertificationSave = (index: number, data: { name: string; issuer: string; year: string }) => {
    const newCertifications = [...certificationsData]
    newCertifications[index] = data
    setCertificationsData(newCertifications)
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button
            onClick={handleAddEducation}
            variant="outline"
            className="text-green-600 border-green-500"
          >
            Add Education
          </Button>
        </CardHeader>
        <CardContent>
          {educationData.length === 0 ? (
            <p className="text-muted-foreground italic">No education listed</p>
          ) : (
            <div className="space-y-4">
              {educationData.map((edu, index) => (
                <div key={index} className="group/item relative border rounded-lg p-4">
                  <EditButton
                    onClick={() => setEditingEducation(index)}
                    className="right-2 top-2 opacity-0 group-hover/item:opacity-100"
                  />
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </p>

                  {editingEducation === index && (
                    <EditModal
                      title="Edit Education"
                      isOpen={true}
                      onClose={() => setEditingEducation(null)}
                      onSave={(data) => {
                        handleEducationSave(index, data)
                        setEditingEducation(null)
                      }}
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
                          id: "startDate",
                          label: "Start Date",
                          type: "text",
                          value: edu.startDate,
                        },
                        {
                          id: "endDate",
                          label: "End Date (leave empty for present)",
                          type: "text",
                          value: edu.endDate,
                        },
                      ]}
                      extraButtons={
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newEducation = educationData.filter((_, i) => i !== index)
                            setEducationData(newEducation)
                            setEditingEducation(null)
                          }}
                          className="mr-auto"
                        >
                          Delete Education
                        </Button>
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="group relative">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certifications</CardTitle>
          <Button
            onClick={handleAddCertification}
            variant="outline"
            className="text-green-600 border-green-500"
          >
            Add Certification
          </Button>
        </CardHeader>
        <CardContent>
          {certificationsData.length === 0 ? (
            <p className="text-muted-foreground italic">No certifications listed</p>
          ) : (
            <div className="space-y-4">
              {certificationsData.map((cert, index) => (
                <div key={index} className="group/item relative border rounded-lg p-4">
                  <EditButton
                    onClick={() => setEditingCertification(index)}
                    className="right-2 top-2 opacity-0 group-hover/item:opacity-100"
                  />
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </p>

                  {editingCertification === index && (
                    <EditModal
                      title="Edit Certification"
                      isOpen={true}
                      onClose={() => setEditingCertification(null)}
                      onSave={(data) => {
                        handleCertificationSave(index, data)
                        setEditingCertification(null)
                      }}
                      fields={[
                        {
                          id: "name",
                          label: "Certification Name",
                          type: "text",
                          value: cert.name,
                        },
                        {
                          id: "issuer",
                          label: "Issuing Organization",
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
                      extraButtons={
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newCertifications = certificationsData.filter((_, i) => i !== index)
                            setCertificationsData(newCertifications)
                            setEditingCertification(null)
                          }}
                          className="mr-auto"
                        >
                          Delete Certification
                        </Button>
                      }
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

