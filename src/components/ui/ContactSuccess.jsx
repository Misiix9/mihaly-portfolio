import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import Button from './Button'
import LottiePlayer from './LottiePlayer'

export default function ContactSuccess({ onBack }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const containerRef = useRef(null)

  useEffect(() => {
    if (reduced || !containerRef.current) return

    // Staggered entrance animation
    const elements = containerRef.current.querySelectorAll('.animate-in')
    
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
      }
    )

    // Floating animation for success icon
    const successIcon = containerRef.current.querySelector('.success-icon')
    if (successIcon) {
      gsap.to(successIcon, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      })
    }
  }, [reduced])

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto text-center py-12">
      {/* Success Animation */}
      <div className="animate-in success-icon mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-400/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Alternative: Lottie success animation */}
        {/* <LottiePlayer
          src="https://lottie.host/success-animation.json"
          className="w-24 h-24 mx-auto mb-6"
          autoplay
          loop={false}
        /> */}
      </div>

      {/* Success Message */}
      <div className="animate-in space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-white">{t('contact.success.title')}</h2>
        <p className="text-xl text-white/80">{t('contact.success.subtitle')}</p>
      </div>

      {/* Next Steps */}
      <div className="animate-in mb-8">
        <h3 className="text-lg font-semibold text-white mb-6">{t('contact.success.next_steps')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              step: 1, 
              text: t('contact.success.step1'),
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )
            },
            { 
              step: 2, 
              text: t('contact.success.step2'),
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )
            },
            { 
              step: 3, 
              text: t('contact.success.step3'),
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              )
            }
          ].map(({ step, text, icon }) => (
            <div key={step} className="p-4 rounded-xl glass-light border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80">
                {icon}
              </div>
              <div className="text-sm font-medium text-white mb-1">{t('common.step_number', { number: step })}</div>
              <div className="text-sm text-white/70">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="animate-in mb-8">
        <p className="text-sm text-white/70 mb-4">{t('contact.success.social')}</p>
        <div className="flex justify-center space-x-4">
          {[
            { 
              name: 'GitHub', 
              url: 'https://github.com/Misiix9',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )
            },
            { 
              name: 'LinkedIn', 
              url: '#',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )
            }
          ].map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="p-3 rounded-xl glass-light border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              data-magnetic="0.15"
              data-cursor-text={name}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="animate-in">
        <Button
          onClick={onBack}
          variant="primary"
          size="lg"
          className="rounded-xl"
          data-magnetic="0.2"
          data-cursor-text="Back"
        >
          {t('contact.success.cta')}
        </Button>
      </div>
    </div>
  )
}
