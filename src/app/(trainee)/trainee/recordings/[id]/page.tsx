import { db } from "@/database";
import { submission } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function RecordingDetail({ params }: PageProps) {
  const recording = await db.query.submission.findFirst({
    where: eq(submission.id, params.id),
  });

  if (!recording) return notFound();

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Recording Details</h1>
                <Button asChild variant="outline">
                    <Link href="/trainee/dashboard">Back to Dashboard</Link>
                </Button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                        Submitted on: {recording.createdAt ? new Date(recording.createdAt).toLocaleDateString() : 'Unknown date'}
                    </h2>
                    <span
                        className={`px-3 py-1 rounded-full text-sm ${
                            recording.status === "reviewed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {recording.status === "reviewed" ? "Reviewed" : "Pending Review"}
                    </span>
                </div>

                <div className="aspect-video bg-black rounded-lg mb-6">
                    <video
                        src={recording.videoUrl}
                        controls
                        className="w-full h-full rounded-lg"
                    />
                </div>

                {recording.feedback ? (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Instructor Feedback</h3>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p>{recording.feedback}</p>
                        </div>
                    </div>
                ) : (
                    <p>No feedback available for this recording.</p>
                )}
            </div>
        </div>
    );
}
