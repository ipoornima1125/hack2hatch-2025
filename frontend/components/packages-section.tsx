"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditButton } from "@/components/edit-button"
import { EditModal } from "@/components/edit-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Package {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

interface PackagesSectionProps {
  packages?: Package[]
}

const defaultPackages: Package[] = [
  {
    id: "basic",
    name: "Basic Package",
    price: 99,
    description: "Perfect for small projects",
    features: ["Up to 5 pages", "Basic SEO", "Mobile Responsive"],
  },
  {
    id: "pro",
    name: "Pro Package",
    price: 199,
    description: "Ideal for growing businesses",
    features: ["Up to 10 pages", "Advanced SEO", "Custom Design", "Priority Support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    description: "Full-scale solutions",
    features: ["Unlimited pages", "Full optimization", "24/7 Support", "Custom Features"],
  },
]

export function PackagesSection({ packages = defaultPackages }: PackagesSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [packagesData, setPackagesData] = useState(packages)

  const handleSave = (index: number, data: any) => {
    const newPackages = [...packagesData]
    const processedData = {
      ...data,
      price: Number(data.price),
      features: data.features.split(',').map((f: string) => f.trim()),
      id: packagesData[index]?.id || `package-${Date.now()}`
    }
    
    newPackages[index] = processedData
    setPackagesData(newPackages)
  }

  const handleDelete = (index: number) => {
    const newPackages = packagesData.filter((_, i) => i !== index)
    setPackagesData(newPackages)
    setEditingIndex(null)
  }

  const handleAddPackage = () => {
    const newPackage: Package = {
      id: `package-${Date.now()}`,
      name: "New Package",
      price: 0,
      description: "Package description",
      features: ["Feature 1", "Feature 2"]
    }
    setPackagesData([...packagesData, newPackage])
    setEditingIndex(packagesData.length)
  }

  return (
    <Card className="group relative">
      <div className="flex justify-between items-center px-6 pt-6">
        <CardTitle className="text-2xl font-bold">Packages</CardTitle>
        <Button
          onClick={handleAddPackage}
          variant="outline"
          className="text-green-600 border-green-500"
        >
          Add Package
        </Button>
      </div>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packagesData.map((pkg, index) => (
            <Card key={pkg.id} className="relative group/item">
              <EditButton
                onClick={() => setEditingIndex(index)}
                className="absolute right-2 top-2 opacity-0 group-hover/item:opacity-100"
              />
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  ${pkg.price}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>
                <div className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {editingIndex === index && (
                  <EditModal
                    title="Edit Package"
                    isOpen={true}
                    onClose={() => setEditingIndex(null)}
                    onSave={(data) => {
                      handleSave(index, data)
                      setEditingIndex(null)
                    }}
                    fields={[
                      {
                        id: "name",
                        label: "Package Name",
                        type: "text",
                        value: pkg.name,
                      },
                      {
                        id: "price",
                        label: "Price",
                        type: "text",
                        value: pkg.price.toString(),
                      },
                      {
                        id: "description",
                        label: "Description",
                        type: "textarea",
                        value: pkg.description,
                      },
                      {
                        id: "features",
                        label: "Features (comma-separated)",
                        type: "textarea",
                        value: pkg.features.join(", "),
                      },
                    ]}
                    extraButtons={
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleDelete(index)}
                        className="mr-auto"
                      >
                        Delete Package
                      </Button>
                    }
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 