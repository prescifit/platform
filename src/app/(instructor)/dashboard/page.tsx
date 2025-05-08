import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function InstructorDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  if (session?.user.role !== "instructor") redirect("/user/dashboard"); // or 403 page
    
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Instructor dashboard</h1>
      <p>Your future “list of classes” will render here.</p>
    </main>
  );
}