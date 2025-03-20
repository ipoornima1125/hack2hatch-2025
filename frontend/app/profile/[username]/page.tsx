import { ProfileCard } from "@/components/profile-card"
import { BioSection } from "@/components/bio-section"
import { PostsSection, type Post } from "@/components/posts-section"
import { InfoSection } from "@/components/info-section"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { PackagesSection } from "@/components/packages-section"
import { Availability } from "@/components/availability"
import { InnovationsSection } from "@/components/innovations-section"

// First, let's define the Package type
interface Package {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

interface Innovation {
  id: string
  title: string
  description: string
  status: string
  technologies: string[]
}

// Define a common interface for all profile types
interface ProfileData {
  fullName: string
  industry: string
  skills: string[]
  bio: string
  education: { 
    institution: string
    degree: string
    startDate: string
    endDate: string 
  }[]
  certifications: { name: string; issuer: string; year: string }[]
  posts: Post[]
  infoItems: { 
    title: string
    content: string
    type?: "text" | "availability"
    availableDates?: Date[]
  }[]
  packages: Package[]
  availableDates?: Date[]
  innovations: Innovation[]
}

// This would typically be a database or API call
async function getProfileData(username: string) {
  // Mock data - in a real app, fetch from API/database
  const profiles: Record<string, ProfileData> = {
    johnsmith: {
      fullName: "John Smith",
      industry: "Web Development",
      skills: ["React", "Next.js", "UI Design"],
      bio: "Passionate web developer with over 5 years of experience creating modern, responsive web applications.",
      education: [
        { 
          institution: "University of Technology",
          degree: "BSc Computer Science",
          startDate: "2014",
          endDate: "2018"
        }
      ],
      certifications: [{ name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2021" }],
      posts: [] as Post[],
      infoItems: [
        { title: "Looking for", content: "Collaboration opportunities with startups and established businesses" },
      ],
      innovations: [
        {
          id: "innovation-1",
          title: "Open Source Component Library",
          description: "A modern React component library with a focus on accessibility and customization.",
          status: "In Progress",
          technologies: ["React", "TypeScript", "Storybook", "Jest"]
        },
        {
          id: "innovation-2",
          title: "AI-Powered Code Review Tool",
          description: "Automated code review tool that provides intelligent suggestions for code improvements.",
          status: "Planning",
          technologies: ["Python", "Machine Learning", "Git"]
        }
      ],
      packages: [
        {
          id: "basic",
          name: "Basic Package",
          price: 99,
          description: "Perfect for small projects",
          features: ["Up to 5 pages", "Basic SEO", "Mobile Responsive"],
        },

        {
          id: "intermediate",
          name: "Intermediate Package",
          price: 199,
          description: "Perfect for medium projects",
          features: ["Up to 5 pages", "Intermediate SEO", "Mobile Responsive"],
        },

        
        {
          id: "advanced",
          name: "Advanced Package",
          price: 299,
          description: "Perfect for large projects",
          features: ["Up to 5 pages", "Advanced SEO", "All devices Responsive"],
        },
      ],
    },
    janedoe: {
      fullName: "Jane Doe",
      industry: "UX Design",
      skills: ["Figma", "User Research", "Prototyping"],
      bio: "UX designer focused on creating intuitive and accessible digital experiences.",
      education: [{ 
        institution: "Design Academy", 
        degree: "BA Design", 
        startDate: "2019",
        endDate: "2019"
      }],
      certifications: [{ name: "Certified UX Professional", issuer: "UX Alliance", year: "2020" }],
      posts: [] as Post[],
      infoItems: [
        { title: "Looking for", content: "Collaboration with developers and product managers" },
      ],
      innovations: [
        {
          id: "innovation-1",
          title: "Accessibility Design System",
          description: "A comprehensive design system focused on making web applications more accessible to all users.",
          status: "In Progress",
          technologies: ["Figma", "WCAG", "Design Systems"]
        }
      ],
      packages: [
        {
          id: "ux-basic",
          name: "UX Audit",
          price: 299,
          description: "Comprehensive UX analysis",
          features: ["Heuristic Evaluation", "User Flow Analysis", "Basic Recommendations"],
        },
      ],
    },
  }

  return profiles[username as keyof typeof profiles] || null
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profileData = await getProfileData(params.username)

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
          <div className="space-y-6">
            <BioSection
              bio={profileData.bio}
              education={profileData.education}
              certifications={profileData.certifications}
            />
            <Availability 
              availableDates={profileData.availableDates} 
              title="Available for Meetings"
            />
          </div>
        </div>

        {/* Vertical separator for desktop */}
        <div className="hidden md:block md:col-span-1">
          <Separator orientation="vertical" className="h-full mx-auto" />
        </div>

        {/* Right column - Posts, Info, Innovations, Packages */}
        <div className="md:col-span-7">
          <div className="space-y-6">
            <PostsSection posts={profileData.posts} />
            <InfoSection items={profileData.infoItems} />
            <InnovationsSection innovations={profileData.innovations} />
            <PackagesSection packages={profileData.packages} />
          </div>
        </div>
      </div>
    </main>
  )
}

