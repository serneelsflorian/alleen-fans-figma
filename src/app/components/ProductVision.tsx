import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  Heart, 
  ShoppingBag,
  Bell,
  Share2,
  Target,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function ProductVision() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#1DB954]/10">
      {/* Back button */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#1DB954]/10 rounded-full border border-[#1DB954]/20">
            <Sparkles className="w-4 h-4 text-[#1DB954]" />
            <span className="text-sm text-[#1DB954] font-medium">Product Vision</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-[#1DB954] to-slate-900 bg-clip-text text-transparent">
            SportsFeed
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A next-generation sports media platform that combines real-time content aggregation, 
            AI-powered insights, and seamless commerce in a mobile-first experience.
          </p>
        </motion.div>

        {/* Value Proposition */}
        <Section title="Value Proposition" icon={<Target className="w-6 h-6" />}>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-[#1DB954]" />}
              title="Lightning Fast"
              description="Real-time sports news aggregated from multiple trusted sources, delivered instantly to your personalized feed."
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-purple-500" />}
              title="AI-Augmented"
              description="Contextual AI insights including stats, player info, timelines, and comparisons enhance every article."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-rose-500" />}
              title="Truly Personal"
              description="Progressive personalization learns your preferences and evolves your feed based on behavior over time."
            />
          </div>
        </Section>

        {/* Key Differentiators */}
        <Section title="Competitive Differentiation" icon={<TrendingUp className="w-6 h-6" />}>
          <div className="space-y-4">
            <DifferentiatorCard
              title="AI Context Panels"
              description="Unlike traditional sports apps, we embed AI-generated insights directly into articles - summaries, live stats, player comparisons, and timelines that update in real-time."
            />
            <DifferentiatorCard
              title="Frictionless Commerce"
              description="Shop sports products and equipment directly from articles with editorially-aligned recommendations that feel natural, not intrusive."
            />
            <DifferentiatorCard
              title="Social Virality Built-In"
              description="Ultra-fast sharing to social platforms and messaging apps with deep links that preserve context and personalization."
            />
            <DifferentiatorCard
              title="Progressive Personalization"
              description="Starts with explicit interests (sports, teams) then evolves based on reading patterns, engagement signals, and implicit preferences."
            />
          </div>
        </Section>

        {/* User Personas */}
        <Section title="Target Personas" icon={<Users className="w-6 h-6" />}>
          <div className="grid md:grid-cols-2 gap-6">
            <PersonaCard
              name="The Super Fan"
              age="25-45"
              behavior="Checks scores multiple times daily, follows 3-5 teams religiously, shares content frequently"
              goals="Stay updated on every detail, never miss breaking news, engage with community"
            />
            <PersonaCard
              name="The Casual Enthusiast"
              age="18-35"
              behavior="Checks highlights and major news, follows 1-2 sports casually, prefers curated content"
              goals="Quick updates without overwhelm, discover interesting stories, easy sharing"
            />
            <PersonaCard
              name="The Fantasy Player"
              age="25-40"
              behavior="Needs player stats and injury updates, follows multiple teams, data-driven decisions"
              goals="Get actionable insights fast, track player performance, optimize fantasy teams"
            />
            <PersonaCard
              name="The Emerging Fan"
              age="16-30"
              behavior="New to sports or exploring new sports, needs context and explanations, social-first"
              goals="Learn without feeling lost, discover exciting moments, share with friends"
            />
          </div>
        </Section>

        {/* Information Architecture */}
        <Section title="Information Architecture" icon={<BarChart3 className="w-6 h-6" />}>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">App Structure</h4>
            <div className="space-y-3 text-slate-700">
              <ArchItem level={1} title="Onboarding Flow" description="Interest selection (sports → teams) with progressive disclosure" />
              <ArchItem level={1} title="Main Feed" description="Personalized article stream with filtering and search" />
              <ArchItem level={2} title="Filters" description="All, For You, Trending, Saved, Sport-specific" />
              <ArchItem level={2} title="Article Cards" description="Hero image, metadata, excerpt, tags, save action" />
              <ArchItem level={1} title="Article Detail" description="Immersive reading experience with AI enhancements" />
              <ArchItem level={2} title="AI Insights Panel" description="Summary, Stats, Players, Comparisons (toggleable)" />
              <ArchItem level={2} title="Commerce Integration" description="Related products contextually displayed" />
              <ArchItem level={2} title="Actions" description="Save, Share, AI toggle" />
              <ArchItem level={1} title="Profile & Settings" description="Manage interests, preferences, and app settings" />
              <ArchItem level={2} title="Interest Management" description="Add/remove sports and teams dynamically" />
              <ArchItem level={2} title="Preferences" description="Notifications, AI enhancements, personalization level" />
            </div>
          </div>
        </Section>

        {/* Key Features */}
        <Section title="Core Features" icon={<Sparkles className="w-6 h-6" />}>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureListItem icon={<Bell />} title="Smart Notifications" description="Breaking news alerts personalized to your interests" />
            <FeatureListItem icon={<Share2 />} title="Viral Sharing" description="One-tap sharing with rich previews and deep links" />
            <FeatureListItem icon={<Heart />} title="Save & Follow" description="Bookmark articles and follow evolving stories" />
            <FeatureListItem icon={<ShoppingBag />} title="In-Article Commerce" description="Purchase gear without leaving the reading experience" />
            <FeatureListItem icon={<Sparkles />} title="AI Summaries" description="Get the key points in seconds with AI-generated summaries" />
            <FeatureListItem icon={<BarChart3 />} title="Live Stats" description="Real-time player and team statistics embedded in articles" />
            <FeatureListItem icon={<TrendingUp />} title="Trending Feed" description="See what's hot across all sports right now" />
            <FeatureListItem icon={<Target />} title="Hyper-Personalization" description="Feed improves continuously based on your behavior" />
          </div>
        </Section>

        {/* AI Strategy */}
        <Section title="AI & Personalization Strategy" icon={<Sparkles className="w-6 h-6" />}>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-semibold text-slate-900 mb-3">How AI Enhances Reading</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Contextual Summaries:</strong> AI generates concise summaries so readers can quickly decide if they want to dive deeper</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Live Statistics:</strong> Player and team stats are automatically extracted and displayed in digestible cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Comparison Views:</strong> Head-to-head team/player comparisons with visual data representations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span><strong>Event Timelines:</strong> Game-changing moments presented chronologically for easy scanning</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1DB954]/10 rounded-xl p-6 border border-[#1DB954]/20">
              <h4 className="font-semibold text-slate-900 mb-3">Progressive Personalization Logic</h4>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <strong className="text-[#1DB954]">Stage 1 - Explicit:</strong> User selects sports and teams during onboarding
                </div>
                <div>
                  <strong className="text-[#1DB954]">Stage 2 - Behavioral:</strong> Track read time, saves, shares, and clicks to refine content ranking
                </div>
                <div>
                  <strong className="text-[#1DB954]">Stage 3 - Predictive:</strong> ML models predict interest in new teams, players, and storylines
                </div>
                <div>
                  <strong className="text-[#1DB954]">Stage 4 - Contextual:</strong> Time of day, breaking news, and seasonal events influence feed priority
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-slate-900 mb-3">Ethical & Transparent AI Usage</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>AI features are clearly labeled and can be toggled off</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Original editorial content is always preserved and primary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Personalization logic is explainable - users can see why content was recommended</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Privacy-first: personal data never shared with third parties</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Design Principles */}
        <Section title="Design Principles" icon={<Zap className="w-6 h-6" />}>
          <div className="grid md:grid-cols-2 gap-4">
            <PrincipleCard
              number="01"
              title="Mobile-First, Always"
              description="Every feature designed for thumb-friendly mobile interaction, then enhanced for desktop"
            />
            <PrincipleCard
              number="02"
              title="Speed Over Everything"
              description="Lightning-fast load times, instant transitions, and real-time updates without lag"
            />
            <PrincipleCard
              number="03"
              title="Editorial Clarity"
              description="Typography, spacing, and visual hierarchy optimized for reading comprehension"
            />
            <PrincipleCard
              number="04"
              title="Minimal Friction"
              description="Every action is one tap away - save, share, navigate, purchase"
            />
            <PrincipleCard
              number="05"
              title="Joyful Micro-Interactions"
              description="Delightful animations and feedback that make the experience memorable"
            />
            <PrincipleCard
              number="06"
              title="Accessible to All"
              description="WCAG AA compliant with support for screen readers and keyboard navigation"
            />
          </div>
        </Section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-slate-200"
        >
          <p className="text-slate-500">
            SportsFeed - Designed for the modern sports fan
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#1DB954]/10 rounded-lg text-[#1DB954]">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function DifferentiatorCard({ 
  title, 
  description 
}: { 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-gradient-to-r from-[#1DB954]/10 to-white rounded-xl p-5 border border-[#1DB954]/20">
      <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function PersonaCard({ 
  name, 
  age, 
  behavior, 
  goals 
}: { 
  name: string; 
  age: string; 
  behavior: string; 
  goals: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h4 className="font-semibold text-slate-900 mb-1">{name}</h4>
      <p className="text-sm text-slate-500 mb-4">{age}</p>
      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium text-[#1DB954] uppercase">Behavior</span>
          <p className="text-sm text-slate-600 mt-1">{behavior}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-purple-600 uppercase">Goals</span>
          <p className="text-sm text-slate-600 mt-1">{goals}</p>
        </div>
      </div>
    </div>
  );
}

function ArchItem({ 
  level, 
  title, 
  description 
}: { 
  level: number; 
  title: string; 
  description: string;
}) {
  return (
    <div className={`${level === 2 ? 'ml-6 border-l-2 border-[#1DB954]/30 pl-4' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`font-medium ${level === 1 ? 'text-slate-900' : 'text-slate-700'}`}>
          {title}
        </div>
      </div>
      <div className="text-sm text-slate-500 mt-0.5">{description}</div>
    </div>
  );
}

function FeatureListItem({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
      <div className="text-[#1DB954] mt-0.5">{icon}</div>
      <div>
        <h4 className="font-medium text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function PrincipleCard({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="text-3xl font-bold text-[#1DB954]/20 mb-2">{number}</div>
      <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}