import LoginForm  from "../../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

