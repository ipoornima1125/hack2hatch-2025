import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button asChild variant="outline">
            <Link href="/">Logout</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-12">
          <div className="grid gap-6">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-2xl font-bold">Welcome to your dashboard!</h2>
              <p className="mb-4 text-muted-foreground">
                Your account has been created successfully. This is a placeholder dashboard.
              </p>
              <p className="text-muted-foreground">
                In a real application, this page would display content specific to your account type.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

