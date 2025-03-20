import { ProfileCard } from "@/components/profile-card"
import { BioSection } from "@/components/bio-section"
import { PostsSection, type Post } from "@/components/posts-section"
import { InfoSection } from "@/components/info-section"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"


// This would typically be a database or API call
async function getProfileData(username: string) {
  // Mock data - in a real app, fetch from API/database
  const profiles = {
    johnsmith: {
      fullName: "John Smith",
      industry: "Web Development",
      skills: ["React", "Next.js", "UI Design"],
      bio: "Passionate web developer with over 5 years of experience creating modern, responsive web applications.",
      education: [{ institution: "University of Technology", degree: "BSc Computer Science", year: "2018" }],
      certifications: [{ name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2021" }],
      posts: [] as Post[],
      infoItems: [
        { title: "Availability", content: "Available for freelance projects starting June 2023" },
        { title: "Packages", content: "Custom web development, UI/UX design, Technical consultation" },
        { title: "Innovations", content: "Currently developing an open-source component library for React" },
        { title: "Looking for", content: "Collaboration opportunities with startups and established businesses" },
      ],
    },
    janedoe: {
      fullName: "Jane Doe",
      industry: "UX Design",
      skills: ["Figma", "User Research", "Prototyping"],
      bio: "UX designer focused on creating intuitive and accessible digital experiences.",
      education: [{ institution: "Design Academy", degree: "BA Design", year: "2019" }],
      certifications: [{ name: "Certified UX Professional", issuer: "UX Alliance", year: "2020" }],
      posts: [] as Post[],
      infoItems: [
        { title: "Availability", content: "Currently accepting new clients" },
        { title: "Packages", content: "UX audits, Design systems, User research" },
        { title: "Innovations", content: "Developing a design system for accessibility" },
        { title: "Looking for", content: "Collaboration with developers and product managers" },
      ],
    },
  }

  return profiles[username as keyof typeof profiles] || null
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  // We need to await params before using its properties
  const { username } = await params
  const profileData = await getProfileData(username)

  if (!profileData) {
    notFound()
  }

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
          <PostsSection posts={profileData.posts} />
          <InfoSection items={profileData.infoItems} />
        </div>
      </div>
    </main>
  )
}

