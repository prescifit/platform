'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // Create a ref for the CTA section
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Function to scroll to the CTA section
  const scrollToCta = () => {
    ctaSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  // Function to handle sign in with role
  const handleSignIn = (role: 'trainee' | 'instructor') => {
    // Save the role in localStorage or sessionStorage
    sessionStorage.setItem('userRole', role);
    // Redirect to the sign-in page
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg" // Replace with your fitness hero image
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

      {/* Featured Classes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={`/class-${item}.jpg`} // Replace with actual class images
                  alt={`Class ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">High-Intensity Interval Training</h3>
                <p className="text-gray-600 mb-4">45-min session with Coach Sarah</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold">$29.99</span>
                  <Button variant="outline">Preview</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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
