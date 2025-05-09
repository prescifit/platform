import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const demoClasses = [
  {
    id: "squad",
    title: "Squad Training",
    description: "Build lower body strength with our intensive squat program",
    photo: "/demo/squat.jpg",
    price: 49.99,
    duration: "1 hr"
  },
  {
    id: "dumbbell", 
    title: "Dumbbell Press",
    description: "Master proper form for maximum upper body gains",
    photo: "/demo/dumbbell.jpg",
    price: 44.99,
    duration: "1 hr"
  },
  {
    id: "rowing",
    title: "Rowing Fitness", 
    description: "Make your back stronger with rowing techniques",
    photo: "/demo/rowing.jpg",
    price: 34.99,
    duration: "1 hr"
  }
];

export default function ClassDetail({ params }: { params: { id: string } }) {
  const cls = demoClasses.find(c => c.id === params.id);
  if (!cls) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden border">
          <Image
            src={cls.photo}
            alt={cls.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{cls.title}</h1>
          <div className="flex gap-4">
            <span className="text-gray-600">{cls.duration}</span>
            <span className="font-bold">${cls.price}</span>
          </div>
          <p className="text-gray-700">{cls.description}</p>
          
          <div className="space-y-2 pt-4">
            <Button className="w-full" size="lg">
              Purchase Class
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/classes">Back to Classes</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}