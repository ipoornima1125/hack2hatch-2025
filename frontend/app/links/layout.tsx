import { Header } from "@/components/header"

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {children}
    </div>
  )
} 