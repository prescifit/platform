import { auth } from "@/auth";
import { db } from "@/database";
import { userProfile, purchase, classTable, submission } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VideoUploadDialog } from "@/components/video-upload-dialog";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProfileSection } from "@/components/profile-section";

export default async function TraineeDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  // Fetch trainee data
  const [profile, purchasedCourses, trainingRecordings] = await Promise.all([
    db.query.userProfile.findFirst({
      where: eq(userProfile.userId, session.user.id),
      columns: { 
        username: true,
        email: true,
        height: true, 
        weight: true, 
        age: true }
    }),

    db.select({
      id: classTable.id,
      title: classTable.title,
      progress: purchase.progress,
      thumbnail: classTable.thumbnail
    })
    .from(purchase)
    .innerJoin(classTable, eq(purchase.classId, classTable.id))
    .where(eq(purchase.traineeId, session.user.id)),

    db.select()
      .from(submission)
      .where(eq(submission.traineeId, session.user.id))
  ]);


  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Profile Section */}

      <ProfileSection profile={{
        userId: session.user.id,
        username: profile?.username || undefined,
        height: profile?.height ? Number(profile.height) : undefined,
        weight: profile?.weight ? Number(profile.weight) : undefined,
        age: profile?.age ? Number(profile.age) : undefined
      }} />

      {/* Purchased Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Your Courses ({purchasedCourses.length})
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.length > 0 ? (
            purchasedCourses.map(course => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail || '/placeholder-thumbnail.jpg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{course.title}</h3>
                  <div className="mt-2 space-y-2">
                    <Progress 
                      value={course.progress ? parseFloat(course.progress) : 0} 
                      className="h-2" 
                    />
                    <p className="text-sm text-gray-500">
                      {course.progress || 0}% Complete
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">You haven't purchased any classes yet</p>
              <Button asChild variant="link">
                <Link href="/classes">Browse Classes</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Training Recordings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Training Recordings</h2>
          <VideoUploadDialog traineeId={session.user.id} />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingRecordings.map(recording => (
          <Link 
            key={recording.id} 
            href={`/trainee/recordings/${recording.id}`}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {recording.createdAt ? new Date(recording.createdAt).toLocaleDateString() : 'No date available'}
              </h3>
              <span className="text-sm text-gray-500">
                {recording.status === 'reviewed' ? 'Reviewed' : 'Pending'}
              </span>
            </div>

            <video 
              src={recording.videoUrl}
              controls
              className="w-full h-64 rounded-lg object-cover mt-2"
              style={{ aspectRatio: "16/9" }}
            />

            {recording.feedback && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Instructor Feedback</h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {recording.feedback}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
      </section>
    </div>
  );
}