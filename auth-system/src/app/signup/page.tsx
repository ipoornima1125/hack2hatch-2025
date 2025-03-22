import { SignupForm } from "../../components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-center">Create an Account</h1>
        <SignupForm />
      </div>
    </div>
  )
}

