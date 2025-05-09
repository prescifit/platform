import { db } from "@/database";
import { submission } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page(
  { params }: { params: Promise<{ id: string }> }   // <-- note Promise
) {
  // 1. Resolve the promise
  const { id } = await params;

  // 2. Guard against empty / undefined
  if (!id) return notFound();

  // 3. Query
  const recording = await db.query.submission.findFirst({
    where: eq(submission.id, id),
  });
  if (!recording) return notFound();

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recording Details</h1>
        <Button asChild variant="outline">
          <Link href="/trainee/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* meta row */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            Submitted&nbsp;
            {recording.createdAt
              ? new Date(recording.createdAt).toLocaleDateString()
              : "Unknown"}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              recording.status === "reviewed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {recording.status === "reviewed" ? "Reviewed" : "Pending"}
          </span>
        </div>

        {/* video */}
        <video
          src={recording.videoUrl}
          controls
          className="w-full aspect-video bg-black rounded-lg mb-6"
        />

        {/* feedback */}
        {recording.feedback ? (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Instructor Feedback</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-line">{recording.feedback}</p>
            </div>
          </section>
        ) : (
          <p className="text-gray-500">No feedback available yet.</p>
        )}
      </div>
    </div>
  );
}