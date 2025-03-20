import { Card, CardContent } from "@/components/ui/card"

interface InfoItem {
  title: string
  content: string
}

interface InfoSectionProps {
  items: InfoItem[]
}

export function InfoSection({ items }: InfoSectionProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        {items.map((item, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

