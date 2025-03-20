import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Education {
  institution: string
  degree: string
  year: string
}

interface Certification {
  name: string
  issuer: string
  year: string
}

interface BioSectionProps {
  bio: string
  education: Education[]
  certifications: Certification[]
}

export function BioSection({
  bio = "Experienced professional with a passion for creating intuitive user experiences.",
  education = [],
  certifications = [],
}: BioSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{bio}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-muted-foreground italic">No education listed</p>
          ) : (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}, {edu.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          {certifications.length === 0 ? (
            <p className="text-muted-foreground italic">No certifications listed</p>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}, {cert.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

