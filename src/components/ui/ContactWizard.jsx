import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import { useFormFieldEffect } from '../../lib/anim/useMicroInteractions'
import Button from './Button'

export default function ContactWizard({ onSubmit, loading }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: '',
    // Step 2: Requirements
    budget: '',
    timeline: '',
    features: [],
    // Step 3: Contact Info
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const stepContainerRef = useRef(null)
  const progressBarRef = useRef(null)

  // Form field refs for micro-interactions
  const nameFieldRef = useFormFieldEffect({ scale: 1.02, glowColor: 'rgba(255,255,255,0.3)' })
  const emailFieldRef = useFormFieldEffect({ scale: 1.02, glowColor: 'rgba(255,255,255,0.3)' })
  const companyFieldRef = useFormFieldEffect({ scale: 1.02, glowColor: 'rgba(255,255,255,0.3)' })
  const phoneFieldRef = useFormFieldEffect({ scale: 1.02, glowColor: 'rgba(255,255,255,0.3)' })
  const messageFieldRef = useFormFieldEffect({ scale: 1.01, glowColor: 'rgba(255,255,255,0.3)' })

  const totalSteps = 4

  // Animate step transitions
  useEffect(() => {
    if (reduced || !stepContainerRef.current) return

    // Animate progress bar
    gsap.to(progressBarRef.current, {
      scaleX: currentStep / totalSteps,
      duration: 0.5,
      ease: 'power2.out'
    })

    // Animate step content
    gsap.fromTo(stepContainerRef.current.children,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1
      }
    )
  }, [currentStep, reduced])

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.projectType) newErrors.projectType = t('contact.form.validation.required')
        break
      case 2:
        // Optional validation for requirements
        break
      case 3:
        if (!formData.name) newErrors.name = t('contact.form.validation.required')
        if (!formData.email) newErrors.email = t('contact.form.validation.required')
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.form.validation.email')
        if (formData.phone && !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = t('contact.form.validation.phone')
        }
        break
      case 4:
        if (!formData.message) newErrors.message = t('contact.form.validation.required')
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(4)) {
      onSubmit(formData)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('contact.steps.step1')}</h3>
            <div>
              <label className="block text-sm text-white/70 mb-4">{t('contact.projectType.label')}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'website', icon: '🌐' },
                  { key: 'webapp', icon: '⚡' },
                  { key: 'ecommerce', icon: '🛒' },
                  { key: 'redesign', icon: '🎨' },
                  { key: 'maintenance', icon: '🔧' },
                  { key: 'other', icon: '💡' }
                ].map(({ key, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateFormData('projectType', key)}
                    className={`
                      p-4 rounded-xl border text-left transition-all duration-300 hover:scale-105
                      ${formData.projectType === key
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                      }
                    `}
                    data-magnetic="0.1"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{icon}</span>
                      <span className="font-medium">{t(`contact.projectType.${key}`)}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.projectType && (
                <p className="mt-2 text-sm text-red-400">{errors.projectType}</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('contact.steps.step2')}</h3>
            
            {/* Budget */}
            <div>
              <label className="block text-sm text-white/70 mb-4">{t('contact.budget.label')}</label>
              <div className="space-y-2">
                {['small', 'medium', 'large', 'enterprise', 'discuss'].map(budget => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => updateFormData('budget', budget)}
                    className={`
                      w-full p-3 rounded-lg border text-left transition-all duration-300
                      ${formData.budget === budget
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                      }
                    `}
                    data-magnetic="0.05"
                  >
                    {t(`contact.budget.${budget}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm text-white/70 mb-4">{t('contact.timeline.label')}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['asap', 'month', 'quarter', 'flexible'].map(timeline => (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => updateFormData('timeline', timeline)}
                    className={`
                      p-3 rounded-lg border text-center transition-all duration-300
                      ${formData.timeline === timeline
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                      }
                    `}
                    data-magnetic="0.1"
                  >
                    {t(`contact.timeline.${timeline}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm text-white/70 mb-4">{t('contact.features.label')}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['responsive', 'cms', 'ecommerce', 'animations', 'seo', 'analytics', 'multilingual', 'api'].map(feature => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`
                      p-3 rounded-lg border text-left transition-all duration-300
                      ${formData.features.includes(feature)
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/8'
                      }
                    `}
                    data-magnetic="0.1"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        formData.features.includes(feature) ? 'border-white bg-white' : 'border-white/30'
                      }`}>
                        {formData.features.includes(feature) && (
                          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span>{t(`contact.features.${feature}`)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('contact.steps.step3')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-white/70 mb-2">{t('contact.form.name')}</label>
                <input
                  ref={nameFieldRef}
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-300"
                  placeholder={t('contact.form.name_placeholder')}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-white/70 mb-2">{t('contact.form.email')}</label>
                <input
                  ref={emailFieldRef}
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-300"
                  placeholder={t('contact.form.email_placeholder')}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm text-white/70 mb-2">{t('contact.form.company')}</label>
                <input
                  ref={companyFieldRef}
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-300"
                  placeholder={t('contact.form.company_placeholder')}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-white/70 mb-2">{t('contact.form.phone')}</label>
                <input
                  ref={phoneFieldRef}
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-300"
                  placeholder={t('contact.form.phone_placeholder')}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{t('contact.steps.step4')}</h3>
            
            {/* Summary */}
            <div className="p-4 rounded-xl glass-light border border-white/10 space-y-3">
              <h4 className="font-medium text-white">{t('common.project_summary')}</h4>
              <div className="text-sm text-white/70 space-y-1">
                <p><span className="text-white">{t('common.project_details.type')}</span> {formData.projectType && t(`contact.projectType.${formData.projectType}`)}</p>
                {formData.budget && <p><span className="text-white">{t('common.project_details.budget')}</span> {t(`contact.budget.${formData.budget}`)}</p>}
                {formData.timeline && <p><span className="text-white">{t('common.project_details.timeline')}</span> {t(`contact.timeline.${formData.timeline}`)}</p>}
                {formData.features.length > 0 && (
                  <p><span className="text-white">{t('common.project_details.features')}</span> {formData.features.map(f => t(`contact.features.${f}`)).join(', ')}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm text-white/70 mb-2">{t('contact.form.message')}</label>
              <textarea
                ref={messageFieldRef}
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-300"
                placeholder={t('contact.form.message_placeholder')}
                required
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-white/70">
            {t('contact.wizard.progress', { current: currentStep, total: totalSteps })}
          </span>
          <span className="text-sm text-white/70">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full origin-left transform scale-x-0"
          />
        </div>
      </div>

      {/* Step Content */}
      <div ref={stepContainerRef} className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="secondary"
              size="md"
              className="rounded-xl"
              data-magnetic="0.15"
            >
              {t('contact.wizard.previous')}
            </Button>
          )}
        </div>
        
        <div className="flex space-x-3">
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              variant="primary"
              size="md"
              className="rounded-xl"
              data-magnetic="0.2"
              data-cursor-text="Next"
            >
              {t('contact.wizard.next')}
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="primary"
              size="md"
              loading={loading}
              disabled={loading}
              className="rounded-xl"
              data-magnetic="0.25"
              data-cursor-text="Send"
            >
              {loading ? t('contact.form.sending') : t('contact.wizard.complete')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
