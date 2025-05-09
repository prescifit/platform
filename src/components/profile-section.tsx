"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  height: z.coerce.number().min(1, "Height must be positive"),
  weight: z.coerce.number().min(1, "Weight must be positive"),
  age: z.coerce.number().min(1, "Age must be positive"),
});

export function ProfileSection({
  profile,
}: {
  profile: {
    userId: string;
    username?: string;
    height?: number;
    weight?: number;
    age?: number;
  };
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile?.username || "",
      height: profile?.height || undefined,
      weight: profile?.weight || undefined,
      age: profile?.age || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await updateProfile(profile.userId, data);
    if (result.success) {
      setIsEditing(false);
      router.refresh();
    }
  };

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{profile?.username || '--'}</p>
          </div>
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <input
            {...register("username")}
            className="p-2 border rounded w-full"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Height (cm)</label>
          <input
            type="number"
            {...register("height")}
            className="p-2 border rounded w-full"
          />
          {errors.height && (
            <p className="text-red-500 text-sm">{errors.height.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            {...register("weight")}
            className="p-2 border rounded w-full"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Age</label>
          <input
            type="number"
            {...register("age")}
            className="p-2 border rounded w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
