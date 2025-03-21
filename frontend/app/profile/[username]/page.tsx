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
      fullName: "Alex Chen",
      industry: "AI & Robotics Innovation",
      skills: ["Machine Learning", "Robotics", "Computer Vision", "Python", "ROS"],
      bio: "AI and robotics innovator specializing in autonomous systems. Founder of RoboAI Solutions, developing next-generation healthcare and manufacturing robotics. Previously led R&D at Boston Dynamics with focus on human-robot interaction.",
      education: [
        { 
          institution: "Massachusetts Institute of Technology",
          degree: "Ph.D. in Robotics Engineering",
          startDate: "2015",
          endDate: "2019"
        },
        {
          institution: "Stanford University",
          degree: "MS in Computer Science",
          startDate: "2013",
          endDate: "2015"
        }
      ],
      certifications: [
        { name: "TensorFlow Advanced Certification", issuer: "Google", year: "2022" },
        { name: "AWS Machine Learning Specialty", issuer: "Amazon", year: "2021" },
        { name: "Robotics System Architecture", issuer: "ROS Industrial", year: "2020" }
      ],
      posts: [] as Post[],
      infoItems: [
        { title: "Looking for", content: "Collaboration with researchers and engineers in AI robotics" }
      ],
      innovations: [
        {
          id: "innovation-1",
          title: "HealthBot Assistant",
          description: "An AI-powered robotic assistant for hospitals that automates routine tasks and enhances patient care. Implemented in 5 major hospitals, reducing nurse workload by 30%.",
          status: "In Progress",
          technologies: ["ROS", "Python", "TensorFlow", "Computer Vision", "Sensor Fusion"]
        },
        {
          id: "innovation-2",
          title: "Smart Manufacturing Automation",
          description: "Developed an intelligent robotic system for flexible manufacturing, featuring real-time adaptation and collaborative robot-human workflows.",
          status: "Completed",
          technologies: ["Industrial IoT", "Machine Learning", "Robot Operating System", "C++"]
        },
        {
          id: "innovation-3",
          title: "Autonomous Navigation Framework",
          description: "Open-source framework for robust indoor-outdoor robot navigation, used by over 1000 developers worldwide.",
          status: "In Progress",
          technologies: ["SLAM", "Path Planning", "Sensor Integration", "Python"]
        }
      ],
      packages: [
        {
          id: "robotics-consulting",
          name: "Robotics Innovation Consulting",
          price: 2500,
          description: "Strategic consulting for robotics implementation",
          features: [
            "Technical Architecture Review",
            "AI Integration Strategy",
            "Robotics System Design",
            "Implementation Roadmap"
          ],
        },
        {
          id: "startup-mentoring",
          name: "AI Startup Mentoring",
          price: 1500,
          description: "Guidance for AI/robotics startups",
          features: [
            "Business Model Validation",
            "Technical Stack Review",
            "Market Entry Strategy",
            "Funding Preparation"
          ],
        },
        {
          id: "workshop-training",
          name: "Hands-on Robotics Workshop",
          price: 3500,
          description: "Intensive training for teams",
          features: [
            "Custom Curriculum",
            "Practical Exercises",
            "Code Reviews",
            "Implementation Support",
            "3-Month Follow-up"
          ],
        }
      ],
      availableDates: [
        new Date(2024, 3, 15),
        new Date(2024, 3, 16),
        new Date(2024, 3, 20),
        new Date(2024, 3, 21)
      ]
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

