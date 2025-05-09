"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:     process.env.CLOUDINARY_API_KEY!,
  api_secret:  process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(file: File, onProgress?: (percentage: number) => void) {
  // File in a Server Action is the Web File type; convert to Node Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "prescifit/trainee-submissions",
      },
      (err, result) => {
        if (err)           return reject(err);
        if (!result)       return reject(new Error("No result from Cloudinary"));
        if (!result.secure_url)
                           return reject(new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );

    // Note: Cloudinary doesn't provide native progress events through this API
    // If you need real progress, consider using their upload widget or a different approach
    if (onProgress) {
      // Simulate progress for now
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
        } else {
          onProgress(progress);
        }
      }, 500);
    }

    stream.end(buffer);
  });
}