"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";

export default function SignUp() {
  const params = useSearchParams();
  const role = params.get("role") as "trainee" | "instructor";
  const router = useRouter();

  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [pwd, setPwd]         = useState("");
  const [err, setErr]         = useState("");

  async function register() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password: pwd, role }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) { setErr("Failed"); return; }
    // auto-sign-in
    await nextAuthSignIn("credentials", { email, password: pwd, callbackUrl: `/${role}/dashboard` });
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create your {role} account</h1>
      
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="john@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="••••••••"
            minLength={8}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            At least 8 characters
          </p>
        </div>

        {/* Error Message */}
        {err && <p className="text-red-500 text-sm">{err}</p>}

        {/* Submit Button */}
        <button
          onClick={register}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Account
        </button>

        {/* Already have an account */}
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/signin')}
            className="text-blue-600 hover:underline"
          >
            Sign in instead
          </button>
        </p>

        {/* Or divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Signup */}
        <button
          onClick={() => nextAuthSignIn('google', { 
            callbackUrl: `/${role}/dashboard` 
          })}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            {/* Google SVG icon */}
          </svg>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
