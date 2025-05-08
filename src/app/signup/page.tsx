"use client";
import { signIn } from "@/auth";
import { useState } from "react"; 

export default function SignUpPage() {
  const [role, setRole] = useState<"instructor" | "user">("user");

  const handleSignUp = async () => {
    await signIn("google", {
      callbackUrl: `/api/auth/roles?role=${role}`
    });
  };
  
  return (
    <div>
      <h2>Are you an instructor or user?</h2>
      <select value={role} onChange={(e) => setRole(e.target.value as any)}>
        <option value="user">User</option>
        <option value="instructor">Instructor</option>
      </select>
      <button onClick={handleSignUp}>Continue with Google</button>
    </div>
  );
}
