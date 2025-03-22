"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import AccountTypeSelector from "./account-type-selector"

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    accountType: z.enum(["mentor", "innovator", "technical", "investor", "community"]),
    industry: z.string().optional(),
    skills: z.string().optional(),
    education: z.string().optional(),
    certifications: z.string().optional(),
    bio: z.string().optional(),
    availability: z.string().optional(),
    packages: z.string().optional(),
    portfolio: z.string().optional(),
    innovation: z.string().optional(),
    lookingFor: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormSchemaType = z.infer<typeof formSchema>

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    setValue,
    watch,
    control,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "mentor",
      industry: "",
      skills: "",
      education: "",
      certifications: "",
      bio: "",
      availability: "",
      packages: "",
      portfolio: "",
      innovation: "",
      lookingFor: "",
    },
  })

  // Watch the accountType to conditionally render profile fields
  const selectedAccountType = watch("accountType")

  // Determine which profile fields to show based on account type
  const getFieldsForAccountType = (accountType: string) => {
    const commonFields = ["industry", "bio"]
    switch (accountType) {
      case "mentor":
        return [...commonFields, "skills", "education", "certifications", "availability", "packages"]
      case "innovator":
        return [...commonFields, "skills", "education", "certifications", "innovation", "lookingFor"]
      case "technical":
        return [...commonFields, "skills", "education", "certifications", "portfolio", "lookingFor"]
      case "investor":
        return [...commonFields, "lookingFor"]
      case "community":
        return commonFields
      default:
        return []
    }
  }

  const renderProfileFields = () => {
    if (!selectedAccountType) return null
    const fields = getFieldsForAccountType(selectedAccountType)

    return (
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold tracking-tight">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.includes("industry") && (
            <FormField
              control={control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Technology, Healthcare" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("skills") && (
            <FormField
              control={control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="React, Node.js" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("education") && (
            <FormField
              control={control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. BS Computer Science" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("certifications") && (
            <FormField
              control={control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certifications (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AWS Certified" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("availability") && (
            <FormField
              control={control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Weekdays 5-8 PM" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("packages") && (
            <FormField
              control={control}
              name="packages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packages (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Basic, Premium" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("portfolio") && (
            <FormField
              control={control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {fields.includes("lookingFor") && (
            <FormField
              control={control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Looking For</FormLabel>
                  <FormControl>
                    <Input placeholder="Collaboration opportunities" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>
        {fields.includes("innovation") && (
          <FormField
            control={control}
            name="innovation"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Innovation</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your innovative ideas" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
    )
  }

  const onSubmit = (data: FormSchemaType) => {
    setIsLoading(true)
    console.log(data)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Join our community and connect with like-minded professionals
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...{ control, handleSubmit, setValue }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Account Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Account Type Selector */}
            <AccountTypeSelector
              selectedType={selectedAccountType}
              onSelect={(type) => setValue("accountType", type)}
            />

            {/* Profile Fields */}
            {selectedAccountType && renderProfileFields()}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>

      <CardFooter />
    </Card>
  )
}
