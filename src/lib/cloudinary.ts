"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:     process.env.CLOUDINARY_API_KEY!,
  api_secret:  process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(file: File) {
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

    stream.end(buffer);
  });
}