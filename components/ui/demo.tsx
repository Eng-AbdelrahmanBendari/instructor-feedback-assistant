import React from "react"
import { ThreeDFeedbackCarousel } from "./3d-carousel"

export function ThreeDFeedbackCarouselDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="min-h-[400px] flex flex-col justify-center border-2 border-dashed border-[#1E293B] rounded-2xl p-4 bg-[#FFFDF5]">
        <div className="p-2">
          <ThreeDFeedbackCarousel cards={[]} language="ar" />
        </div>
      </div>
    </div>
  )
}
