import { auth } from "@/auth";
import { db } from "@/database";
import { userProfiles, purchases, classes, submissions } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { VideoUploadDialog } from "@/components/video-upload-dialog";
import { redirect } from "next/navigation";

export default async function TraineeDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  // Fetch trainee data
  const [profile, purchasedCourses, trainingRecordings] = await Promise.all([
    db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, session.user.id),
      columns: { height: true, weight: true, age: true }
    }),

    db.select({
      id: classes.id,
      title: classes.title,
      progress: purchases.progress,
      thumbnail: classes.thumbnail
    })
    .from(purchases)
    .innerJoin(classes, eq(purchases.classId, classes.id))
    .where(eq(purchases.traineeId, session.user.id)),

    db.select()
      .from(submissions)
      .where(eq(submissions.traineeId, session.user.id))
  ]);


  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Profile Section */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Profile</h2>
          <Button variant="outline">Edit Profile</Button>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Height</p>
            <p className="font-medium">{profile?.height || '--'} cm</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">{profile?.weight || '--'} kg</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{profile?.age || '--'}</p>
          </div>
        </div>
      </section>

      {/* Purchased Courses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Courses</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={course.thumbnail || '/placeholder.jpg'}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <div className="mt-2 space-y-2">
                  <Progress value={course.progress ? parseFloat(course.progress) : null} className="h-2" />
                  <p className="text-sm text-gray-500">{course.progress || 0}% Complete</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Training Recordings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Training Recordings</h2>
          <VideoUploadDialog traineeId={session.user.id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingRecordings.map(recording => (
            <div key={recording.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{recording.createdAt ? new Date(recording.createdAt).toLocaleDateString() : 'No date available'}</h3>
                <span className="text-sm text-gray-500">
                  {recording.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                </span>
              </div>
              
              <video 
                src={recording.videoUrl}
                controls
                className="mt-2 w-full rounded-lg"
              />

              {recording.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Instructor Feedback</h4>
                  <p className="text-sm text-gray-600">{recording.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}