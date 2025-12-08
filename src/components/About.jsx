import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Parallax from './ui/Parallax'
import MorphingBlob from './ui/MorphingBlob'
import { BentoGrid, BentoItem } from './ui/BentoGrid'
// Simple SVGs to replace external icons for now
const IconBox = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-neutral-500"
  >
    <path
      d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function About() {
  const { t } = useTranslation()
  const strengths = t('about.strengths', { returnObjects: true })
  const stack = t('about.stack', { returnObjects: true })
  const experience = t('about.experience', { returnObjects: true })
  const reveal = useScrollReveal()

  return (
    <section
      className="relative pt-8 md:pt-12 pb-20 md:pb-32 bg-black"
      id="about"
      data-section="about"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000000',
        minHeight: '100vh',
        transform: 'translateZ(0)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px 300px at 70% 20%, rgba(59, 130, 246, 0.04), transparent 60%),
            radial-gradient(500px 400px at 30% 80%, rgba(168, 85, 247, 0.03), transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.015) 0%, transparent 40%, rgba(59, 130, 246, 0.01) 100%)
          `,
          animation: 'globalFlow 30s ease-in-out infinite'
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10" ref={reveal}>
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Bento Grid Layout */}
        <BentoGrid>
          {/* Main Bio - Large Item */}
          <BentoItem
            title={t('about.mission_title', 'My Mission')}
            description={t('about.mission')}
            header={<div className="flex h-full min-h-[6rem] w-full rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 animate-pulse" />}
            icon={<IconBox />}
            cols={2}
            rows={1}
            className="md:col-span-2"
          >
            <div className="p-4">
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                {t('about.body')}
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-white/80">
                "{t('about.mission')}"
              </div>
            </div>
          </BentoItem>

          {/* Experience - Tall Item */}
          <BentoItem
            title={t('about.experience_title')}
            description={t('about.experience_desc', 'My professional journey')}
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />}
            icon={<IconBox />}
            cols={1}
            rows={2}
          >
            <div className="flex flex-col gap-3 p-4">
              {Array.isArray(experience) && experience.slice(0, 4).map((exp, i) => (
                <div key={i} className="text-xs text-neutral-400 border-b border-white/10 pb-2 last:border-0">
                  {exp}
                </div>
              ))}
            </div>
          </BentoItem>

          {/* Stack - Small Item */}
          <BentoItem
            title={t('about.stack_title')}
            description="My Tech Arsenal"
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />}
            icon={<IconBox />}
            cols={1}
          >
            <div className="flex flex-wrap gap-2 p-2">
              {Array.isArray(stack) && stack.slice(0, 6).map((tech, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-white/10 rounded-md text-white/70">
                  {tech}
                </span>
              ))}
            </div>
          </BentoItem>

          {/* Strengths - Small Item */}
          <BentoItem
            title={t('about.strengths_title')}
            description="Core Competencies"
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />}
            icon={<IconBox />}
            cols={1}
          >
            <ul className="list-disc list-inside text-xs text-neutral-400 p-2 space-y-1">
              {Array.isArray(strengths) && strengths.slice(0, 3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  )
}
