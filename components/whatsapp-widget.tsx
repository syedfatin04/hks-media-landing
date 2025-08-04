"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Phone, Mail } from "lucide-react"
import { useState } from "react"

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = "+971506916419"
    const message = "Hi Abdul Hadi! I'm interested in your influencer marketing services for my wearable tech brand. I found you through the HKS Media website."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-green-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[250px] sm:min-w-[280px]"
          >
                          <div className="text-center mb-4">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Chat with us!</h3>
                <p className="text-sm text-gray-600">Get instant help with your influencer strategy</p>
                <p className="text-xs text-gray-500 mt-1">abdulhadi@hksmediasolutions.com</p>
                <p className="text-xs text-gray-500">+971 50 691 6419</p>
              </div>
            
            <div className="space-y-3">
              <motion.button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-4 w-4" />
                Start WhatsApp Chat
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = 'tel:+971506916419'}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-4 w-4" />
                Call Us Now
              </motion.button>
              
              <motion.button
                onClick={() => window.open('mailto:abdulhadi@hksmediasolutions.com?subject=Influencer Marketing Inquiry', '_blank')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-4 w-4" />
                Email Us
              </motion.button>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-3">
              Usually responds within 5 minutes
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 