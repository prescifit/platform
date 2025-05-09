"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Wrap the component in Suspense
function SignUpContent() {
  const params = useSearchParams();
  const role = params.get("role") as "trainee" | "instructor";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password: pwd, role }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Registration failed");
      }

      await nextAuthSignIn("credentials", {
        email,
        password: pwd,
        redirect: true,
        callbackUrl: `/${role}/dashboard`,
      });
    } catch (error) {
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create your {role} account</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <Button onClick={register} disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading signup form...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
