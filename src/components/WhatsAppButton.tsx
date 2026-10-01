import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setShowPopup(false);
    setDismissed(true);
  };

  const whatsappUrl = "https://wa.me/8801941646278?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20studying%20abroad.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup Chat Bubble */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 max-w-[260px] relative"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pr-4">
              <div className="bg-green-500 p-2 rounded-full">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Keystone Overseas</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Online now</span>
                </div>
              </div>
            </div>

            {/* Chat message bubble */}
            <div className="bg-green-50 border border-green-100 rounded-xl rounded-tl-none p-3 mb-3">
              <p className="text-slate-700 text-sm leading-relaxed">
                👋 Hi! Ready to start your study abroad journey? Chat with us — we reply fast!
              </p>
              <p className="text-xs text-slate-400 mt-1 text-right">Just now</p>
            </div>

            {/* CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Start Chatting
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-all group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setShowPopup(false)}
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.845L.057 23.082a.75.75 0 00.94.94l5.237-1.469A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.184-1.432l-.371-.22-3.848 1.079 1.079-3.848-.22-.371A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
