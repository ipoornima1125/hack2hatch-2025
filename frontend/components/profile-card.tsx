import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface ProfileCardProps {
  fullName: string
  industry: string
  skills: string[]
  avatarUrl?: string
}

export function ProfileCard({
  fullName = "Jane Doe",
  industry = "Software Development",
  skills = ["React", "TypeScript", "UI/UX"],
  avatarUrl,
}: ProfileCardProps) {
  // Generate initials for avatar fallback
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Card className="p-6 flex justify-center items-center">
      <div className="flex  md:flex-row items-center md:items-start gap-6 mb-6">
        <Avatar className="w-32 h-32 border-2 border-border shrink-0">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="text-center flex-col items-center md:text-left">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <p className="text-xl font-medium text-red-500">{industry}</p>

          <div className="flex items-center flex-wrap gap-2 justify-center md:justify-start mt-4">
            {skills.map((skill, index) => (
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
    </Card>
  )
}

