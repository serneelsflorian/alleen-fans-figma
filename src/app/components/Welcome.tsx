import { motion } from 'motion/react';
import { Flame, Sparkles, TrendingUp, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/app/components/ui/button';

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#1DB954] to-[#1DB954]/80 rounded-3xl mb-8 shadow-2xl"
          >
            <Flame className="w-14 h-14 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-[#1DB954]/30 to-white bg-clip-text text-transparent"
          >
            SportsFeed
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-slate-300 mb-12 max-w-lg mx-auto leading-relaxed"
          >
            Your personalized sports news platform powered by AI, delivering real-time updates on the teams and sports you love
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-3 gap-4 mb-12"
          >
            <FeaturePill icon={<Sparkles className="w-5 h-5" />} text="AI Insights" />
            <FeaturePill icon={<TrendingUp className="w-5 h-5" />} text="Real-Time News" />
            <FeaturePill icon={<Flame className="w-5 h-5" />} text="Personalized Feed" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/onboarding" className="flex-1 sm:flex-initial">
              <Button className="w-full h-14 text-lg bg-[#1DB954] hover:bg-[#1DB954]/90 shadow-lg hover:shadow-xl transition-all">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/vision" className="flex-1 sm:flex-initial">
              <Button variant="outline" className="w-full h-14 text-lg border-slate-600 text-white hover:bg-slate-800">
                <Info className="w-5 h-5 mr-2" />
                Product Vision
              </Button>
            </Link>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-slate-500 mt-12"
          >
            Demo application showcasing modern sports media UX
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center px-4 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
      <div className="text-[#1DB954]">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}