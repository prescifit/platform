import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  //const session = await auth();
  //if (session?.user.role !== "user") redirect("/instructor/dashboard");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">User dashboard</h1>
      <p>Your future “browse classes / purchase history” goes here.</p>
    </main>
  );
}