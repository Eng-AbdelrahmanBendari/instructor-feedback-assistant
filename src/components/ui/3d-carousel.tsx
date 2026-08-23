"use client"

import React, { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Star, Sparkles, Copy, Check, ArrowRight, ArrowLeft, Eye } from "lucide-react"
import { Language, StateFeedbackItem, Rating } from "../../types"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

export interface FeedbackCardItem {
  id: string
  rating: Rating
  feedback: StateFeedbackItem
  text: string
  tag: string
  stars: number
  categoryTitle: string
  colorTheme: {
    bg: string
    border: string
    badgeBg: string
    badgeText: string
  }
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.4, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    language,
  }: {
    handleClick: (card: FeedbackCardItem, index: number) => void
    controls: any
    cards: FeedbackCardItem[]
    isCarouselActive: boolean
    language: Language
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )
    const isAr = language === 'ar'

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center items-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + (isAr ? -info.offset.x : info.offset.x) * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + (isAr ? -info.velocity.x : info.velocity.x) * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card, i)}
            >
              {/* Card Face matching 3D Carousel exact aspect-square styling */}
              <div
                className="w-full aspect-square rounded-2xl bg-white border-2 border-slate-700/20 shadow-lg p-3 sm:p-4 flex flex-col justify-between text-start cursor-pointer hover:border-[#0487D9] transition-all hover:scale-[1.02] select-none"
                style={{
                  willChange: "transform",
                }}
              >
                {/* Card Top: Stars & Tag */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-3 h-3 ${
                            sIdx < card.stars
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1E293B] shadow-2xs ${card.colorTheme.badgeBg} ${card.colorTheme.badgeText}`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="font-heading font-black text-xs text-[#0487D9] line-clamp-1 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{card.categoryTitle}</span>
                  </div>

                  {/* Text preview */}
                  <p
                    className="text-[11px] text-slate-700 font-medium leading-relaxed line-clamp-4 whitespace-pre-line"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    {card.text}
                  </p>
                </div>

                {/* Card Bottom */}
                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{isAr ? 'اضغط للمعاينة' : 'Inspect'}</span>
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#E0F2FE] text-[#0487D9] flex items-center justify-center font-black text-[9px]">
                    {isAr ? '←' : '→'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export interface ThreeDFeedbackCarouselProps {
  cards: FeedbackCardItem[]
  language: Language
  onApplyFeedback?: (item: StateFeedbackItem, rating: Rating) => void
}

export function ThreeDFeedbackCarousel({
  cards,
  language,
  onApplyFeedback,
}: ThreeDFeedbackCarouselProps) {
  const [activeCard, setActiveCard] = useState<FeedbackCardItem | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [copied, setCopied] = useState(false)
  const controls = useAnimation()
  const isAr = language === 'ar'

  const handleClick = (card: FeedbackCardItem) => {
    setActiveCard(card)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveCard(null)
    setIsCarouselActive(true)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div layout className="relative w-full">
      {/* Detail Overlay/Modal */}
      <AnimatePresence mode="sync">
        {activeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layoutId={`card-container-${activeCard.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#FFFDF5] rounded-3xl border-3 border-[#1E293B] shadow-pop-lg p-6 text-start relative max-h-[85vh] overflow-y-auto"
              dir={isAr ? 'rtl' : 'ltr'}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: "transform" }}
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full border border-[#1E293B] shadow-xs ${activeCard.colorTheme.badgeBg} ${activeCard.colorTheme.badgeText}`}
                  >
                    {activeCard.tag}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < activeCard.stars
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Title */}
              <div className="mt-4">
                <h4 className="font-heading font-black text-lg sm:text-xl text-[#1E293B] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>{activeCard.categoryTitle}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {isAr
                    ? 'نموذج فيدباك معتمد جاهز للتخصيص والتطبيق المباشر'
                    : 'Verified feedback template ready for direct customization and report submission'}
                </p>
              </div>

              {/* Feedback Content Box */}
              <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-[#1E293B] shadow-sm text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line font-body font-medium select-text">
                {activeCard.text}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={() => handleCopy(activeCard.text)}
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#1E293B] border-2 border-[#1E293B] font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-pop-sm transition-transform active:scale-95 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ النص' : 'Copy Text')}</span>
                </button>

                {onApplyFeedback && (
                  <button
                    type="button"
                    onClick={() => {
                      onApplyFeedback(activeCard.feedback, activeCard.rating)
                      handleClose()
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#0487D9] hover:bg-[#0369A1] text-white border-2 border-[#1E293B] font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-pop transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>{isAr ? 'تطبيق هذا التقييم' : 'Apply This State'}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
          language={language}
        />
      </div>
    </motion.div>
  )
}
