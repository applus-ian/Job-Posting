"use client"

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownRight } from "lucide-react"

const steps = [
  {
    title: "Create account",
    description: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    icon: "👤",
  },
  {
    title: "Upload CV/Resume",
    description: "Curabitur sit amet maximus ligula. Nam a nulla ante.",
    icon: "⬆️",
    highlight: true,
  },
  {
    title: "Find suitable job",
    description: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
    icon: "🔍",
  },
  {
    title: "Apply job",
    description: "Nam sodales purus. Curabitur sit amet maximus ligula.",
    icon: "✅",
  },
]

export default function HiringProcess() {
  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Our Hiring Process</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          We've designed a transparent and efficient hiring process to find the best talent.
        </p>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center w-full md:w-1/4">
              <Card
                className={`w-full transition-all ${
                  step.highlight
                    ? "bg-white shadow-lg"
                    : "bg-transparent border-none shadow-none"
                }`}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div
                    className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full text-2xl ${
                      step.highlight ? "bg-orange-500 text-white" : "bg-white border text-orange-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800">{step.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </CardContent>
              </Card>

              {/* Optional Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-[-10%] top-1/2 transform translate-y-[-50%]">
                  <ArrowDownRight className="rotate-[120deg] text-orange-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
