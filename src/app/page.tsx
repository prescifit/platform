'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function Home() {
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const scrollToCta = () => {
    ctaSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  const handleSignIn = (role: 'trainee' | 'instructor') => {
    sessionStorage.setItem('userRole', role);
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section (unchanged) */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Fitness Class"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Precise. Scientific. Fitness
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join our classes with expert instructors and achieve your fitness goals from anywhere
          </p>
          <Button
            onClick={scrollToCta}
            className="bg-slate-700 hover:bg-slate-400 text-slate-50 text-lg px-8 py-6 rounded-full transition-colors duration-300"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Featured Classes Section - Updated with your demo classes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {demoClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={cls.photo}
                  alt={cls.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cls.title}</h3>
                <p className="text-gray-600 mb-4">{cls.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">${cls.price}</span>
                  <Button asChild variant="outline">
                    <Link href={`/classes/${cls.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section (unchanged) */}
      <section 
        ref={ctaSectionRef} 
        className="bg-black py-16 scroll-mt-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-slate-300 mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => handleSignIn('trainee')}
              className="bg-white text-slate-500 border-white hover:bg-white/10 hover:text-slate-500 px-8 py-4 text-lg"
            >
              Join as Trainee
            </Button>
            <Button
              variant="outline"
              className="text-slate-500 border-white hover:bg-white/10 hover:text-slate-600 px-8 py-4 text-lg"
              onClick={() => handleSignIn('instructor')}
            >
              I'm an Instructor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}