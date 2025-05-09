'use client';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDropzone } from 'react-dropzone';
import { uploadToCloudinary } from '@/lib/cloudinary';

export function VideoUploadDialog({ traineeId }: { traineeId: string }) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': [] },
    onDrop: async (files) => {
      const file = files[0];
      if (!file) return;

      setUploading(true);
      try {
        // Implement your upload logic here
        const videoUrl = await uploadToCloudinary(file);
        
        await fetch('/api/submissions', {
          method: 'POST',
          body: JSON.stringify({ traineeId, videoUrl }),
          headers: { 'Content-Type': 'application/json' }
        });

        setOpen(false);
        window.location.reload();
      } finally {
        setUploading(false);
      }
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload New Recording</Button>
      </DialogTrigger>
      
      <DialogContent>
        <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
          <input {...getInputProps()} />
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <p className="font-medium">Drop video file here</p>
              <p className="text-sm text-gray-500">MP4, MOV, AVI up to 1GB</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
