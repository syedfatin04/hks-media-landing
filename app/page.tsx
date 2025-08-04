"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Users,
  Target,
  Zap,
  ArrowRight,
  Star,
  Globe,
  MessageCircle,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Quote,
  BarChart3,
  Lightbulb,
  Rocket,
  Heart,
  Eye,
} from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { AnimatedLogo } from "@/components/animated-logo"
import { ScrollAnimation } from "@/components/scroll-animation"
import { FloatingElements } from "@/components/floating-elements"
import { ResponsiveGlobe } from "@/components/responsive-globe"
import { WhatsAppWidget } from "@/components/whatsapp-widget"
import { SmoothScrollProvider } from "@/components/smooth-scroll"

function AnimatedGlobe() {
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#1e40af"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export default function HKSMediaLanding() {
  const [formData, setFormData] = useState({
    brandName: "",
    role: "",
    email: "",
    website: "",
    influencerType: "",
    experience: "",
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        console.log("Form submitted successfully:", result)
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            brandName: "",
            role: "",
            email: "",
            website: "",
            influencerType: "",
            experience: "",
          })
        }, 5000)
      } else {
        console.error("Form submission failed:", result.error)
        setIsSubmitting(false)
        // You could add error handling here to show an error message
        alert("There was an error submitting the form. Please try again or contact us directly.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      alert("There was an error submitting the form. Please try again or contact us directly.")
    }
  }

  const scrollToForm = () => {
    document.getElementById("launch-pack-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CMO at TechWear Pro",
      content:
        "HKS Media delivered exactly what they promised. We saw a 340% increase in qualified leads within the first month of working with their recommended influencers.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder of FitTech Solutions",
      content:
        "The influencer strategy was spot-on. Not only did we get great creators, but the content ideas they provided went viral. Best ROI we've ever seen.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Watson",
      role: "Marketing Director at WearableX",
      content:
        "Finally, an agency that understands wearable tech. The influencers they matched us with actually knew our products and created authentic content.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const caseStudies = [
    {
      brand: "Apollo Neuro",
      challenge: "Low brand awareness in wellness space",
      solution: "Partnered with 8 wellness micro-influencers",
      result: "450% increase in brand mentions, 280% boost in sales",
      metric: "450%",
      color: "from-green-500 to-emerald-600",
    },
    {
      brand: "Ultrahuman",
      challenge: "Competing with established fitness brands",
      solution: "Targeted fitness enthusiasts and biohackers",
      result: "Generated 50K+ qualified leads in 3 months",
      metric: "50K+",
      color: "from-blue-500 to-cyan-600",
    },
    {
      brand: "TechWear Co",
      challenge: "Reaching tech-savvy early adopters",
      solution: "Collaborated with tech reviewers and gadget enthusiasts",
      result: "Achieved 15M+ impressions with 8.5% engagement rate",
      metric: "15M+",
      color: "from-purple-500 to-indigo-600",
    },
  ]

  const stats = [
    { number: "150+", label: "Successful Campaigns", icon: TrendingUp },
    { number: "50+", label: "Wearable Brands", icon: Users },
    { number: "2.5M+", label: "Reach Generated", icon: Eye },
    { number: "340%", label: "Average ROI", icon: BarChart3 },
  ]

  const features = [
    {
      icon: Target,
      title: "Precision Targeting",
      description:
        "We use advanced audience analytics to identify influencers whose followers match your ideal customer profile exactly.",
      details: [
        "Demographic analysis",
        "Interest mapping",
        "Purchase behavior tracking",
        "Engagement quality assessment",
      ],
    },
    {
      icon: Lightbulb,
      title: "Creative Strategy",
      description:
        "Our content strategies are built on viral psychology and proven conversion frameworks specific to wearable tech.",
      details: [
        "Viral content formulas",
        "Product demonstration scripts",
        "Storytelling frameworks",
        "Call-to-action optimization",
      ],
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every influencer is thoroughly vetted for authenticity, engagement quality, and brand alignment before recommendation.",
      details: ["Fake follower detection", "Engagement rate analysis", "Brand safety checks", "Content quality review"],
    },
    {
      icon: Rocket,
      title: "Rapid Execution",
      description:
        "From strategy to execution, we move fast without compromising quality. Your campaigns launch within days, not weeks.",
      details: [
        "48-hour strategy delivery",
        "Quick influencer onboarding",
        "Streamlined approval process",
        "Real-time campaign monitoring",
      ],
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            Loading HKS Media Experience...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-blue-100 z-50 shadow-lg"
      >
        <div className="container mx-auto px-4 py-2 sm:py-3 md:py-4">
          <div className="flex justify-between items-center">
            <AnimatedLogo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <motion.a
                href="#services"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Services
              </motion.a>
              <motion.a
                href="#case-studies"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Case Studies
              </motion.a>
              <motion.a
                href="#testimonials"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Testimonials
              </motion.a>
              <motion.a
                href="#about"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                About
              </motion.a>
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className="text-blue-700 hover:text-blue-900"
                  onClick={() => window.location.href = 'tel:+971506916419'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={scrollToForm}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pb-4 border-t border-blue-100"
              >
                <div className="flex flex-col gap-4 pt-4">
                  <motion.a 
                    href="#services" 
                    className="text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </motion.a>
                  <motion.a 
                    href="#case-studies" 
                    className="text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Case Studies
                  </motion.a>
                  <motion.a 
                    href="#testimonials" 
                    className="text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </motion.a>
                  <motion.a 
                    href="#about" 
                    className="text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => {
                        scrollToForm()
                        setIsMenuOpen(false)
                      }} 
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <FloatingElements />
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <ScrollAnimation direction="left">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-sm sm:text-lg px-4 sm:px-6 py-2 border-0 shadow-lg shadow-blue-500/25">
                      🚀 #1 Wearable Tech Marketing Specialists
                    </Badge>
                  </motion.div>

                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Get{" "}
                    <motion.span
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      5 Perfect Influencers
                    </motion.span>{" "}
                    for Your{" "}
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Wearable Brand
                    </span>{" "}
                    — in 48 Hours
                  </motion.h1>

                  <motion.h3
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Test influencer marketing without wasting time or budget. No retainers. No fake reach. Just creators
                    who actually <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">convert customers</span>.
                  </motion.h3>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={scrollToForm}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-7 shadow-2xl shadow-purple-500/25 w-full sm:w-auto"
                    >
                      <Rocket className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                      Claim Your Launch Pack
                      <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-7 bg-white/80 backdrop-blur-sm w-full sm:w-auto"
                      onClick={() => {
                        const phoneNumber = "+971506916419"
                        const message = "Hi Abdul Hadi! I'm interested in your influencer marketing services for my wearable tech brand. I found you through the HKS Media website."
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, '_blank')
                      }}
                    >
                      <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                      WhatsApp Us
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 pt-6 sm:pt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {[
                    { icon: Clock, text: "48-hour delivery", color: "text-emerald-600", bgColor: "bg-emerald-100" },
                    { icon: Shield, text: "No retainers", color: "text-blue-600", bgColor: "bg-blue-100" },
                    { icon: TrendingUp, text: "Results-focused", color: "text-purple-600", bgColor: "bg-purple-100" },
                  ].map((item, index) => (
                    <motion.div key={index} className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start p-2 rounded-lg hover:bg-white/50 transition-colors" whileHover={{ scale: 1.05 }}>
                      <div className={`p-2 rounded-full ${item.bgColor}`}>
                        <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${item.color}`} />
                      </div>
                      <span className="text-slate-700 font-medium text-xs sm:text-sm md:text-base">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.3} animationType="scale">
              <ResponsiveGlobe />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <ScrollAnimation animationType="bounce">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`rounded-2xl p-4 sm:p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    index === 0 ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200' :
                    index === 1 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200' :
                    index === 2 ? 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200' :
                    'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200'
                  }`}>
                    <div className={`p-3 rounded-full mx-auto mb-3 w-fit ${
                      index === 0 ? 'bg-emerald-100' :
                      index === 1 ? 'bg-blue-100' :
                      index === 2 ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto ${
                        index === 0 ? 'text-emerald-600' :
                        index === 1 ? 'text-blue-600' :
                        index === 2 ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <div className={`text-2xl sm:text-3xl font-bold mb-2 ${
                      index === 0 ? 'text-emerald-700' :
                      index === 1 ? 'text-blue-700' :
                      index === 2 ? 'text-purple-700' :
                      'text-orange-700'
                    }`}>{stat.number}</div>
                    <div className="text-slate-600 font-medium text-sm sm:text-base">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Enhanced Problem Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-red-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">
                Tired of influencer campaigns that <span className="text-red-600">flop?</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                You're not alone. 73% of wearable brands struggle with ineffective influencer marketing. Here's why most
                campaigns fail:
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Wrong creators. Wrong audience.",
                description:
                  "Mismatched influencers who don't resonate with your target market, leading to poor engagement and zero conversions.",
                stats: "87% of campaigns fail due to poor targeting",
              },
              {
                icon: Zap,
                title: "Burned budget with no results.",
                description:
                  "Expensive campaigns that generate likes and vanity metrics but zero actual sales or qualified leads for your business.",
                stats: "Average wasted budget: $15,000 per campaign",
              },
              {
                icon: Users,
                title: "No real strategy. Just posts that disappear.",
                description:
                  "Content without purpose that gets lost in the social media noise, with no follow-up or conversion optimization.",
                stats: "95% of influencer posts are forgotten within 24 hours",
              },
            ].map((problem, index) => (
              <ScrollAnimation key={index} delay={index * 0.2} animationType="slide">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="border-red-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${
                      index === 0 ? 'from-red-500 to-orange-500' :
                      index === 1 ? 'from-orange-500 to-yellow-500' :
                      'from-yellow-500 to-red-500'
                    }`} />
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className={`rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6 ${
                        index === 0 ? 'bg-gradient-to-br from-red-100 to-orange-100' :
                        index === 1 ? 'bg-gradient-to-br from-orange-100 to-yellow-100' :
                        'bg-gradient-to-br from-yellow-100 to-red-100'
                      }`}>
                        <problem.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${
                          index === 0 ? 'text-red-600' :
                          index === 1 ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl text-slate-900 mb-3 sm:mb-4">{problem.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed text-sm sm:text-base">{problem.description}</p>
                      <div className={`text-xs sm:text-sm font-semibold rounded-lg p-3 ${
                        index === 0 ? 'text-red-700 bg-red-50 border border-red-200' :
                        index === 1 ? 'text-orange-700 bg-orange-50 border border-orange-200' :
                        'text-yellow-700 bg-yellow-50 border border-yellow-200'
                      }`}>{problem.stats}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation>
            <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Sound familiar? You're not alone.</h3>
              <p className="text-xl text-slate-600 mb-8">
                Most wearable brands struggle with this. That's exactly why we created the Influencer Launch Pack.
              </p>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
                >
                  Skip the Struggle - Get Results Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Enhanced Offer Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <Badge className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-lg px-6 py-3 mb-6 shadow-lg shadow-emerald-500/25">
                🎁 Introducing Our Solution
              </Badge>
              <h2 className="text-5xl font-bold text-slate-900 mb-6">The Influencer Launch Pack</h2>
              <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Everything you need to launch successful influencer campaigns — delivered as a comprehensive strategy in
                just 48 hours
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <ScrollAnimation direction="left">
              <div className="space-y-8">
                {[
                  {
                    icon: Users,
                    title: "5 hand-picked influencers matched to your brand",
                    description:
                      "Carefully vetted creators with engaged audiences in your niche, complete with detailed audience analytics and engagement metrics.",
                    details: [
                      "Audience demographics breakdown",
                      "Engagement rate analysis",
                      "Content style assessment",
                      "Brand alignment score",
                    ],
                  },
                  {
                    icon: Lightbulb,
                    title: "3 viral content ideas they can execute",
                    description:
                      "Proven content formats that drive engagement and sales, customized for your specific product and brand voice.",
                    details: [
                      "Product demonstration scripts",
                      "Storytelling frameworks",
                      "Trending format adaptations",
                      "Call-to-action optimization",
                    ],
                  },
                  {
                    icon: MessageCircle,
                    title: "5 proven outreach messages you can copy-paste",
                    description:
                      "Templates that get responses and close deals, tested across hundreds of successful campaigns.",
                    details: [
                      "Initial contact templates",
                      "Follow-up sequences",
                      "Negotiation frameworks",
                      "Contract templates",
                    ],
                  },
                  {
                    icon: Clock,
                    title: "Delivered as a clean PDF within 48 hours",
                    description:
                      "Professional, actionable report you can implement immediately, with step-by-step execution guide.",
                    details: [
                      "Executive summary",
                      "Detailed influencer profiles",
                      "Content calendar template",
                      "Performance tracking sheet",
                    ],
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`rounded-xl p-3 flex-shrink-0 ${
                      index === 0 ? 'bg-gradient-to-br from-blue-100 to-indigo-100' :
                      index === 1 ? 'bg-gradient-to-br from-emerald-100 to-teal-100' :
                      index === 2 ? 'bg-gradient-to-br from-purple-100 to-pink-100' :
                      'bg-gradient-to-br from-orange-100 to-red-100'
                    }`}>
                      <feature.icon className={`h-6 w-6 ${
                        index === 0 ? 'text-blue-600' :
                        index === 1 ? 'text-emerald-600' :
                        index === 2 ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 mb-3">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="text-lg opacity-90 mb-3">Regular Price</div>
                    <div className="text-4xl font-bold line-through opacity-75 mb-2">₹1,999 / $25</div>
                    <div className="text-sm opacity-75">Per brand strategy</div>
                  </div>

                  <motion.div
                    className="mb-8"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge className="bg-yellow-400 text-yellow-900 text-xl px-6 py-3 mb-4">
                      🎁 LIMITED TIME OFFER
                    </Badge>
                    <div className="text-6xl font-bold mb-2">FREE</div>
                    <div className="text-xl opacity-90">First 3 brands only</div>
                  </motion.div>

                  <div className="bg-white/20 rounded-2xl p-6 mb-8">
                    <h4 className="font-bold text-lg mb-3">What We Need From You:</h4>
                    <div className="text-left space-y-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Honest feedback on our strategy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>Testimonial if you're happy with results</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Case study participation (optional)</span>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={scrollToForm}
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 w-full font-bold"
                    >
                      Claim Your FREE Launch Pack
                      <Rocket className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>

                  <div className="text-sm opacity-75 mt-4">⏰ Only 2 spots remaining this week</div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation>
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Why This Offer Is Completely Risk-Free</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Shield, title: "No Upfront Payment", desc: "Get the full strategy before paying anything" },
                  { icon: Clock, title: "48-Hour Guarantee", desc: "Delivered on time or your next strategy is free" },
                  { icon: Award, title: "100% Satisfaction", desc: "Not happy? We'll revise until you are" },
                ].map((guarantee, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <guarantee.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 mb-2">{guarantee.title}</h4>
                    <p className="text-slate-600">{guarantee.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Real Results from Real Brands</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                See how we've helped wearable tech brands achieve breakthrough results with strategic influencer
                partnerships
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                  <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${study.color}`} />
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{study.brand}</h3>
                        <div
                          className={`text-4xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}
                        >
                          {study.metric}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Challenge:</h4>
                          <p className="text-slate-600">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Solution:</h4>
                          <p className="text-slate-600">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Result:</h4>
                          <p className="text-slate-600">{study.result}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Form Section */}
      <section id="launch-pack-form" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <ScrollAnimation animationType="bounce">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-lg px-6 py-3 animate-pulse">
                  🚀 Ready to Get Started?
                </Badge>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Get Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FREE</span> Launch Pack
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Fill out this detailed form and we'll deliver your custom influencer strategy within 48 hours. 
                The more information you provide, the better we can tailor your strategy.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3} animationType="slide">
            <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">Thank You!</h3>
                  <p className="text-lg text-slate-600 mb-6">
                    Your submission has been received. We'll review your information and deliver your custom 
                    influencer strategy within 48 hours. You'll also receive a confirmation email at {formData.email}.
                  </p>
                  <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-blue-900 mb-3">What happens next?</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>We'll analyze your requirements within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Research and vet potential influencers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        <span>Deliver your complete strategy package</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Submit Another Request
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Influencer Launch Pack</h3>
                    <p className="text-blue-100">Complete Strategy in 48 Hours</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="h-4 w-4" />
                    <span>5 Hand-picked Influencers</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="h-4 w-4" />
                    <span>3 Viral Content Ideas</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="h-4 w-4" />
                    <span>5 Outreach Templates</span>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div 
                        whileFocus={{ scale: 1.02 }} 
                        className="space-y-2"
                      >
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Brand Name *
                        </label>
                        <Input
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleInputChange}
                          placeholder="Your brand name"
                          required
                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base p-4 rounded-xl transition-all duration-200"
                        />
                      </motion.div>
                      <motion.div 
                        whileFocus={{ scale: 1.02 }} 
                        className="space-y-2"
                      >
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Your Role *
                        </label>
                        <Input
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="e.g., Founder, Marketing Manager"
                          required
                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base p-4 rounded-xl transition-all duration-200"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </h4>
                    <div className="space-y-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base p-4 rounded-xl transition-all duration-200"
                        />
                      </motion.div>

                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Website / Instagram
                        </label>
                        <Input
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourbrand.com or @yourbrand"
                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base p-4 rounded-xl transition-all duration-200"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Campaign Details
                    </h4>
                    <div className="space-y-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          What kind of influencers are you looking for? *
                        </label>
                        <Textarea
                          name="influencerType"
                          value={formData.influencerType}
                          onChange={handleInputChange}
                          placeholder="Describe your ideal influencer (niche, audience size, content style, demographics, etc.)"
                          required
                          className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base p-4 rounded-xl min-h-[120px] transition-all duration-200"
                        />
                      </motion.div>

                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                          Have you worked with influencers before? *
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className="w-full p-4 text-base border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                        >
                          <option value="">Select your experience level</option>
                          <option value="yes">Yes, we have experience with influencer marketing</option>
                          <option value="no">No, this is our first time</option>
                          <option value="limited">Limited experience (1-2 campaigns)</option>
                        </select>
                      </motion.div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    className="text-center pt-6"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 px-12 rounded-2xl shadow-2xl shadow-blue-500/25 w-full sm:w-auto font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-3 h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-3 h-5 w-5" />
                          Get My FREE Launch Pack
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Trust Indicators */}
                  <div className="text-center space-y-4 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Secure & Private</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>48hr Delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span>100% Free</span>
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium">
                      ⏰ We'll review your submission and deliver your custom strategy within 48 hours
                    </p>
                                     </div>
                 </form>
               </div>
               </>
               )}
             </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
              <p className="text-xl text-slate-600">
                Don't just take our word for it. Here's what wearable tech brands say about working with us.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <Quote className="h-8 w-8 text-blue-200 mb-4" />

                      <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">"{testimonial.content}"</p>

                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{testimonial.name}</div>
                          <div className="text-slate-600 text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Leading Wearable Brands</h2>
              <p className="text-xl text-slate-600">
                Join the growing list of successful wearable tech companies we've helped scale
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {[
                "Apollo Neuro",
                "Flo Mattress",
                "Ultrahuman",
                "Atovio",
                "Innergize",
                "Seven Ring",
                "TechWear Co",
                "FitTech",
                "WearOS",
                "SmartBand",
                "HealthTech",
                "BioWear",
              ].map((brand, index) => (
                <motion.div
                  key={brand}
                  className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg font-bold text-slate-700">{brand}</div>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation direction="left">
              <div className="space-y-8">
                <div>
                  <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mb-6">👋 Meet the Founder</Badge>
                  <h2 className="text-5xl font-bold text-slate-900 mb-6">Who's Behind HKS Media Group?</h2>
                </div>

                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    I'm <strong className="text-slate-900 text-xl">Hadi</strong> — solo founder obsessed with connecting
                    wearable brands with creators that actually move buyers, not just generate vanity metrics.
                  </p>
                  <p>
                    After seeing too many brands waste thousands on influencer campaigns that looked good on paper but
                    delivered zero ROI, I decided to do things differently.
                  </p>
                  <p>
                    <strong className="text-slate-900">Not an agency with overhead.</strong> Just direct, niche,
                    results-first campaigns. I work fast, scrappy, and only with brands I actually believe in.
                  </p>
                  <p>
                    My background in data analytics and 5+ years in wearable tech marketing means I understand both the
                    numbers and the nuances of this space.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                    <div className="text-slate-600">Years in Wearable Tech</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                    <div className="text-slate-600">Successful Campaigns</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium">4.9/5 from 50+ brands</span>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                  />

                  <Globe className="h-16 w-16 mb-6 opacity-80" />
                  <h3 className="text-3xl font-bold mb-6">Why Choose HKS Media?</h3>

                  <div className="space-y-4">
                    {[
                      { icon: Target, text: "Wearable tech specialist with deep industry knowledge" },
                      { icon: BarChart3, text: "Data-driven approach with proven methodologies" },
                      { icon: Clock, text: "Lightning-fast 48-hour strategy delivery" },
                      { icon: Shield, text: "No long-term contracts or hidden fees" },
                      { icon: Users, text: "Personal attention from the founder, not junior staff" },
                      { icon: TrendingUp, text: "Focus on ROI and actual business results" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-lg">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">My Promise to You</h4>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    "I'll treat your brand like my own. Every recommendation I make is something I'd implement for my
                    own business. No fluff, no filler — just strategies that work."
                  </p>
                  <div className="mt-4 text-right">
                    <div className="font-bold text-slate-900">— Hadi, Founder</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">How We Deliver Results</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our proven methodology combines data science, psychology, and deep wearable tech expertise to create
                campaigns that actually convert
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 flex-shrink-0">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                      <p className="text-slate-600 text-lg mb-6 leading-relaxed">{feature.description}</p>

                      <div className="grid grid-cols-2 gap-3">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Why This Actually Works</h2>
              <p className="text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                We don't guess. We reverse-engineer your ideal buyer's behavior. We pick creators based on audience
                data, content match, and buying psychology.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Deep Audience Analysis",
                description:
                  "We analyze demographics, interests, purchasing behavior, and engagement patterns to find the perfect match.",
                stats: "97% audience alignment rate",
              },
              {
                icon: Users,
                title: "Content-Brand Synergy",
                description:
                  "We align creator content style with your brand voice, values, and product positioning for authentic partnerships.",
                stats: "85% higher engagement vs industry average",
              },
              {
                icon: TrendingUp,
                title: "Conversion-Focused Selection",
                description:
                  "We select influencers with proven track records of driving actual sales, not just likes and comments.",
                stats: "340% average ROI improvement",
              },
            ].map((item, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }}>
                  <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <item.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                      <div className="text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg p-3">{item.stats}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">The Bottom Line</h3>
                <p className="text-2xl mb-8 opacity-90 leading-relaxed">
                  → No spreadsheets. No fluff. Just 5 people who can actually sell your product.
                </p>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    onClick={scrollToForm}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-10 py-6"
                  >
                    Get My Strategy Now
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-600">Everything you need to know about the Influencer Launch Pack</p>
            </div>
          </ScrollAnimation>

          <div className="space-y-6">
            {[
              {
                question: "How do you find the right influencers for my specific wearable product?",
                answer:
                  "We use a proprietary 7-step vetting process that includes audience demographic analysis, engagement quality assessment, content style evaluation, brand safety checks, and conversion history review. We don't just look at follower count – we analyze who their audience actually is and whether they match your ideal customer profile.",
              },
              {
                question: "What if I'm not happy with the influencers you recommend?",
                answer:
                  "We offer unlimited revisions until you're completely satisfied. If our initial recommendations don't meet your expectations, we'll go back to the drawing board and find new creators that better align with your vision. Your success is our success.",
              },
              {
                question: "How is this different from other influencer marketing agencies?",
                answer:
                  "Most agencies are generalists who work across all industries. We specialize exclusively in wearable tech, which means we understand your unique challenges, target audience, and what actually drives conversions in this space. Plus, you work directly with the founder, not junior account managers.",
              },
              {
                question: "Do you help with the actual outreach and campaign management?",
                answer:
                  "The Launch Pack includes proven outreach templates and negotiation frameworks, but the initial package focuses on strategy. However, if you want us to handle the full campaign management, we offer that as a separate service for clients who see success with the Launch Pack.",
              },
              {
                question: "What size influencers do you typically recommend?",
                answer:
                  "It depends on your goals and budget, but we typically focus on micro-influencers (10K-100K followers) and mid-tier creators (100K-500K) because they often have higher engagement rates and more affordable rates. We avoid mega-influencers unless there's a specific strategic reason.",
              },
              {
                question: "How quickly can I expect to see results from the recommended influencers?",
                answer:
                  "Most of our clients start seeing initial results (increased website traffic, social mentions, inquiries) within 1-2 weeks of launching campaigns with our recommended creators. Sales typically follow within 2-4 weeks, depending on your product price point and sales cycle.",
              },
            ].map((faq, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <ScrollAnimation>
            <div className="space-y-8">
              <Badge className="bg-white/20 text-white text-lg px-6 py-3">🎯 Last Chance</Badge>

              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ready to Stop Wasting Money on Influencer Marketing?
              </h2>

              <p className="text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
                Influencer marketing doesn't have to suck. Try the Influencer Launch Pack. No risk. No fluff. Just
                results.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">What You Get Today:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {[
                    "5 hand-picked influencers",
                    "3 viral content ideas",
                    "5 proven outreach templates",
                    "48-hour delivery guarantee",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={scrollToForm}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-12 py-8 shadow-2xl"
                  >
                    <Rocket className="mr-3 h-6 w-6" />
                    Claim My FREE Launch Pack
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-8 bg-transparent"
                    onClick={() => {
                      const phoneNumber = "+971506916419"
                      const message = "Hi Abdul Hadi! I'm interested in your influencer marketing services for my wearable tech brand. I found you through the HKS Media website."
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                  >
                    <MessageCircle className="mr-3 h-6 w-6" />
                    Message on WhatsApp
                  </Button>
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-8 text-lg opacity-90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Only 2 spots left</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>48hr delivery</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatedLogo className="text-white" />
                <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                  The only influencer marketing agency exclusively focused on wearable tech brands. We connect you with
                  creators who actually convert customers, not just generate likes.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Youtube, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                <div className="space-y-4">
                  {[
                    { name: "Services", href: "#services" },
                    { name: "Case Studies", href: "#case-studies" },
                    { name: "Testimonials", href: "#testimonials" },
                    { name: "About Us", href: "#about" },
                    { name: "Get Started", href: "#launch-pack-form" },
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="block text-slate-300 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <a 
                      href="mailto:abdulhadi@hksmediasolutions.com" 
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      abdulhadi@hksmediasolutions.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <a 
                      href="tel:+971506916419" 
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      +971 50 691 6419
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-blue-400" />
                    <span className="text-slate-300">WhatsApp Available</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                    <span className="text-slate-300">
                      San Francisco, CA
                      <br />
                      Remote-First Company
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-slate-800 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-slate-300 mb-6">
                Get weekly insights on wearable tech marketing and influencer trends
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-8">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400">© 2024 HKS Media Group. All rights reserved.</div>
              <div className="flex gap-6 text-sm text-slate-400">
                <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                  Privacy Policy
                </motion.a>
                <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                  Terms of Service
                </motion.a>
                <motion.a href="#" className="hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                  Cookie Policy
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
    </SmoothScrollProvider>
  )
}
