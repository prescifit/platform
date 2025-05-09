'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/* ---------- helper (outside component) ---------- */
async function uploadToCloudinary(
  file: File,
  onProgress?: (pct: number) => void,
) {
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', preset);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress((e.loaded / e.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else reject(xhr.statusText);
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(form);
  });
}

/* ---------- component ---------- */
export function VideoUploadDialog({ traineeId }: { traineeId: string }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  /* drop-zone */
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': ['.mp4', '.mov', '.avi'] },
    multiple: false,
    maxSize: 1_073_741_824, // 1 GB
    onDrop: async ([file]) => {
      if (!file) return;

      setUploading(true);
      setProgress(0);

      try {
        /* 1 . upload */
        const { secure_url } = await uploadToCloudinary(file, (pct) =>
          setProgress(Math.round(pct)),
        );

        /* 2 . save submission */
        const res = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            traineeId,
            videoUrl: secure_url,
          }),
        });
        if (!res.ok) throw new Error('Failed to save submission');

        /* 3 . done */
        toast.success('Upload successful!', {
          description: 'Your video has been submitted for review.',
        });
        setUploading(false);
        setProgress(0);
        setOpen(false);
        router.refresh();
      } catch (err) {
        toast.error('Upload failed', {
          description:
            err instanceof Error ? err.message : 'Unknown error occurred',
        });
        setUploading(false);
      }
    },
  });

  /* ---------- JSX ---------- */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload New Recording</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload training video</DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <ReloadIcon className="h-4 w-4 animate-spin" />
              <Progress value={progress} className="w-3/4" />
              <p className="text-sm text-muted-foreground">{progress}%</p>
            </div>
          ) : (
            <>
              <DialogDescription>
                Select or drag & drop a video file (MP4, MOV, AVI, MKV, WEBM) up to 1GB.
              </DialogDescription>
              <Button variant="outline" className="mt-4">
                Select file
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}