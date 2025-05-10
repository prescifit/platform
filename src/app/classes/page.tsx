import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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

export default function ClassesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Fitness Classes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoClasses.map((cls) => (
          <div key={cls.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-video relative">
              <Image
                src={cls.photo}
                alt={cls.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{cls.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{cls.duration}</p>
              <p className="text-gray-700 mt-2">{cls.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium">${cls.price}</span>
                <Button asChild size="sm">
                  View Class
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}