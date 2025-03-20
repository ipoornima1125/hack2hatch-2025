"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"

interface AvailabilityProps {
  availableDates?: Date[]
  title?: string
}

export function Availability({ 
  availableDates = [], 
  title = "My Availability"
}: AvailabilityProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [dates, setDates] = useState<Date[]>(availableDates)

  const handleSave = (data: { availableDates: string }) => {
    // Convert comma-separated date strings to Date objects
    const newDates = data.availableDates
      .split(',')
      .map(dateStr => dateStr.trim())
      .filter(Boolean)
      .map(dateStr => new Date(dateStr))
      .filter(date => !isNaN(date.getTime()))

    setDates(newDates)
    setIsEditing(false)
  }

  return (
    <Card className="group relative w-full">
      <EditButton 
        onClick={() => setIsEditing(true)} 
        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity" 
      />
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center md:justify-start overflow-hidden">
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={(dates) => dates && setDates(dates)}
            modifiers={{
              available: dates
            }}
            modifiersStyles={{
              available: { color: 'green', backgroundColor: '#dcfce7' }
            }}
            className="rounded-lg border shadow-sm bg-white p-3"
            disabled={(date) => date < new Date()}
            fromDate={new Date()}
            numberOfMonths={1}
          />
        </div>
      </CardContent>

      <EditModal
        title="Edit Availability"
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
        fields={[
          {
            id: "availableDates",
            label: "Available Dates (comma-separated YYYY-MM-DD)",
            type: "textarea",
            value: dates
              .map(date => date.toISOString().split('T')[0])
              .join(', '),
          },
        ]}
      />
    </Card>
  )
} 