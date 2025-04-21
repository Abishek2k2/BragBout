'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { BookOpen, Users, GraduationCap } from "lucide-react"

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Academic Success Starts Here
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Buy and sell study notes, connect with seniors, and excel in your academic journey with BragBout.
              </p>
            </div>
            <div className="space-x-4">
              {isSignedIn ? (
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Why Choose BragBout?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buy Notes Feature */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Buy Notes</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Access high-quality study materials from top students. Save time and improve your grades.
              </p>
            </div>

            {/* Sell Notes Feature */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Sell Notes</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Turn your study materials into income. Share your knowledge and earn while helping others.
              </p>
            </div>

            {/* Connect with Seniors Feature */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-white dark:bg-gray-900 rounded-full">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Connect with Seniors</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get guidance from experienced students. Build your network and learn from the best.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
