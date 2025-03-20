import { ProfileCard } from "@/components/profile-card"
import { BioSection } from "@/components/bio-section"
import { PostsSection, type Post } from "@/components/posts-section"
import { InfoSection } from "@/components/info-section"
import { Separator } from "@/components/ui/separator"

// This would typically come from an API or database
const profileData = {
  fullName: "John Smith",
  industry: "Web Development",
  skills: ["React", "Next.js", "UI Design"],
  bio: "Passionate web developer with over 5 years of experience creating modern, responsive web applications. Focused on delivering clean, maintainable code and exceptional user experiences.\n\nSpecializing in React and Next.js development with a strong foundation in UI/UX principles.",
  education: [
    { institution: "University of Technology", degree: "BSc Computer Science", year: "2018" },
    { institution: "Design Institute", degree: "UI/UX Certificate", year: "2019" },
  ],
  certifications: [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2021" },
    { name: "Professional React Developer", issuer: "React Academy", year: "2020" },
  ],
}

// Sample posts data
const posts: Post[] = []

// Info sections data
const infoItems = [
  { title: "Availability", content: "Available for freelance projects starting June 2023" },
  { title: "Packages", content: "Custom web development, UI/UX design, Technical consultation" },
  { title: "Innovations", content: "Currently developing an open-source component library for React" },
  { title: "Looking for", content: "Collaboration opportunities with startups and established businesses" },
]

export default function ProfilePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      {/* Top section with profile pic, name and industry */}
      <ProfileCard fullName={profileData.fullName} industry={profileData.industry} skills={profileData.skills} />

      {/* Two column layout for bio and content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        {/* Left column - Bio, Education, Certifications */}
        <div className="md:col-span-4">
          <BioSection
            bio={profileData.bio}
            education={profileData.education}
            certifications={profileData.certifications}
          />
        </div>

        {/* Vertical separator for desktop */}
        <div className="hidden md:block md:col-span-1">
          <Separator orientation="vertical" className="h-full mx-auto" />
        </div>

        {/* Right column - Posts, Availability, etc. */}
        <div className="md:col-span-7 space-y-6">
          <PostsSection posts={posts} />
          <InfoSection items={infoItems} />
        </div>
      </div>
    </main>
  )
}

