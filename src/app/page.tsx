'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setSubmitError(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-full min-h-screen bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-20"></div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Logo Section */}
        <div
          className={`mb-8 sm:mb-12 transition-all duration-1000 transform ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="mb-6 sm:mb-8 mx-auto glass-effect p-3 sm:p-4 inline-block rounded-2xl glow-effect">
            <Image
              src="/images/loylsmall.jpg"
              alt="Logo"
              width={130}
              height={130}
              className="h-auto w-24 sm:w-32"
              priority
            />
          </div>
        </div>

        {/* Main Heading */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-200 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Coming Soon</span>
          </h1>
          <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Subtitle */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light">
            We are building something extraordinary
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            A unified digital ecosystem designed to connect, integrate, and elevate your experience. 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              The future is being created.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 px-4 transition-all duration-1000 delay-400 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { icon: '🌐', title: 'Unified', desc: 'Seamlessly integrated platform' },
            { icon: '⚡', title: 'Innovative', desc: 'Cutting-edge technology stack' },
            { icon: '🔐', title: 'Secure', desc: 'Enterprise-grade security' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="glass-effect p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Email Signup */}
        <div
          className={`w-full max-w-md px-4 transition-all duration-1000 delay-500 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="glass-effect p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-white text-center">
              Get Notified When We Launch
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? 'Subscribing...' : 'Notify Me'}
              </button>
            </form>
            {submitMessage && (
              <p className="text-xs sm:text-sm text-green-400 text-center mt-4">
                ✓ {submitMessage}
              </p>
            )}
            {submitError && (
              <p className="text-xs sm:text-sm text-red-400 text-center mt-4">
                ✕ {submitError}
              </p>
            )}
            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 transform ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-gray-500 text-sm">
            © 2026 Loyal. All rights reserved.
          </p>
        </div>
      </div>

      {/* Cursor glow effect */}
      <style jsx>{`
        @keyframes delay-2000 {
          0% {
            animation-delay: 2s;
          }
        }
        @keyframes delay-4000 {
          0% {
            animation-delay: 4s;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  )
}
