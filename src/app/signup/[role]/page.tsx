"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, use } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
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
      {/* ... rest of UI */}
      <Button onClick={register} disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </div>
  );
}