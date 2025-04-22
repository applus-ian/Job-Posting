"use client"

import { Button } from "@/components/ui/button"

export default function JoinTeamSection() {
  return (
    <section className="w-full py-30 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side (Image Placeholder) */}
        <div className="w-full md:w-1/2 h-64 bg-gray-100 flex items-center rounded-xl justify-center text-2xl font-medium text-gray-600">
          <img src="images/join-team.jpeg" alt="image" className="w-full h-[350px] object-cover rounded-xl shadow-md" />
        </div>

        {/* Right Side (Text + Button) */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-gray-500 text-lg mb-6 leading-relaxed">
            Take the next step in your career with a company that values innovation,
            collaboration, and growth. Explore exciting opportunities across departments
            and be part of a team that makes an impact.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  )
}
