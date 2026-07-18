import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Shield,
  Clock,
  FileText,
  Lock,
  Globe,
  Rocket,
  Sparkles,
  ArrowRight,
  Mail,
  Zap,
  Phone,
  MapPin,
  Award,
  BarChart3,
  Menu,
  X,
  Star,
  Check,
  ChevronDown
} from 'lucide-react';

import {
  FaGithub,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
import { TruvaLogo } from '../components/ui/TruvaLogo';
import { cn } from '../utils/cn';

// ============================================
// DATA
// ============================================

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const stats = [
  { value: '99.9%', label: 'Accuracy Rate', icon: Award },
  { value: '50K+', label: 'Analyses Run', icon: BarChart3 },
  { value: '4.9/5', label: 'User Rating', icon: Star },
  { value: '24/7', label: 'Support', icon: Clock },
];

const features = [
  {
    icon: Shield,
    title: 'Digital Trust Analysis',
    description: 'Evaluate the authenticity and reliability of digital content with AI-powered analysis.',
    color: 'emerald'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Advanced AI models analyze content patterns to provide comprehensive trust insights.',
    color: 'emerald'
  },
  {
    icon: Zap,
    title: 'Real-Time Results',
    description: 'Get instant analysis results with detailed reports and actionable recommendations.',
    color: 'emerald'
  },
  {
    icon: FileText,
    title: 'Comprehensive Reports',
    description: 'Generate detailed reports with confidence scores, findings, and recommendations.',
    color: 'emerald'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Your data is encrypted and private. We never store your content without permission.',
    color: 'emerald'
  },
  {
    icon: Globe,
    title: 'Global Trust Network',
    description: 'Access a global network of trust signals and reputation data for comprehensive analysis.',
    color: 'emerald'
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'month',
    description: 'Perfect for individuals getting started',
    features: [
      '10 analyses per month',
      'Basic trust reports',
      'Email support',
      '1 user',
      'Standard analyzers'
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'month',
    description: 'For professionals and power users',
    features: [
      'Unlimited analyses',
      'Advanced trust reports',
      'Priority email support',
      'Up to 5 users',
      'All analyzers',
      'Export reports',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams and organizations',
    features: [
      'Unlimited everything',
      'Custom analyzers',
      'Dedicated support',
      'Unlimited users',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment'
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    content: 'Truva has transformed how we evaluate digital content. The accuracy is remarkable, and the insights are invaluable.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=1'
  },
  {
    name: 'Michael Chen',
    role: 'Security Lead, DataFlow',
    content: 'The AI-powered analysis is incredibly accurate. We\'ve reduced our risk assessment time by 80%.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=2'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager, InnovateLabs',
    content: 'Truva\'s report generation is top-notch. The confidence scores help us make better decisions faster.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=3'
  },
  {
    name: 'David Kim',
    role: 'Founder, TrustWorks',
    content: 'The platform\'s ability to detect manipulated content is impressive. It\'s become an essential tool for our team.',
    rating: 5,
    image: 'https://i.pravatar.cc/100?img=4'
  },
];

const faqs = [
  {
    question: 'What is Truva?',
    answer: 'Truva is an AI-powered Digital Trust Analysis Platform that helps users evaluate the trustworthiness and reliability of digital content.'
  },
  {
    question: 'How does the analysis work?',
    answer: 'You submit content, and our AI analyzers process it to generate confidence scores, findings, and recommendations.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, all data is encrypted and protected. We never store your content without your permission.'
  },
  {
    question: 'Can I integrate Truva with my existing tools?',
    answer: 'Yes, we offer API access and integrations with popular platforms for seamless workflow integration.'
  },
  {
    question: 'What types of content can I analyze?',
    answer: 'Truva supports various content types including documents, text, URLs, images, and more.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You can start with our Starter plan for free and upgrade as your needs grow.'
  },
];

// ============================================
// MAIN LANDING PAGE
// ============================================

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);

  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#2a2a2a]'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <TruvaLogo size="md" showText={true} />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-gray-400 hover:text-white transition text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get Started
                    <ArrowRight className="ml-1.5" size={14} />
                  </Button>
                </Link>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-[#2a2a2a]">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="block text-gray-400 hover:text-white transition py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t border-[#2a2a2a]">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.svg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/20" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
            >
              <Rocket size={14} />
              <span>AI-Powered Trust Analysis</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Trust Every
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Digital Decision
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              AI-powered digital trust analysis platform that helps you evaluate the
              authenticity and reliability of digital content in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="min-w-[200px] group">
                  Start Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <a href="#features" onClick={(e) => scrollToSection(e, '#features')}>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-4"
                >
                  <div className="flex justify-center mb-1">
                    <stat.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 z-10"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" ref={featuresRef} className="py-20 px-4 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Truva?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines advanced AI with intuitive design to provide
              comprehensive digital trust analysis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Submit Content', progress: 25, icon: FileText },
                { label: 'AI Analysis', progress: 50, icon: Sparkles },
                { label: 'Generate Results', progress: 75, icon: BarChart3 },
                { label: 'Get Reports', progress: 100, icon: Award },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isFeaturesInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5, type: 'spring' }}
                    className="w-16 h-16 rounded-full border-2 border-emerald-500 mx-auto mb-4 flex items-center justify-center bg-[#1a1a1a] hover:scale-110 transition-transform"
                  >
                    <step.icon className="w-6 h-6 text-emerald-400" />
                  </motion.div>

                  <div className="relative">
                    <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isFeaturesInView ? { width: `${step.progress}%` } : {}}
                        transition={{ delay: 0.7 + index * 0.15, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-emerald-500"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-2 font-medium">
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" ref={pricingRef} className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our
              core AI analysis engine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={cn(
                  "bg-[#1a1a1a] rounded-xl border p-8 relative transition-all duration-300",
                  plan.popular
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/10 md:scale-105"
                    : "border-[#2a2a2a] hover:border-emerald-500/30"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? 'primary' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by professionals and organizations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic flex-1">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-white/5 transition"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4",
                      activeFAQ === index && "rotate-180"
                    )}
                  />
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join thousands of users who trust Truva for their digital content analysis needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>hello@truva.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Link to="/register">
                  <Button size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            </div>

            <form
              className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Send us a message</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition resize-none"
              />
              <Button type="submit" className="w-full">
                Send Message
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <TruvaLogo size="md" showText={true} />
              <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
                Trust Every Digital Decision. AI-powered digital trust analysis platform.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5">
                  <FaGithub size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="text-gray-400 hover:text-white transition text-sm">Features</a></li>
                <li><a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="text-gray-400 hover:text-white transition text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition text-sm">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2026 <span className="text-white font-medium">Truva</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Building confidence in every digital interaction.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span className="font-medium text-gray-300">
                A MacDotCom Product
              </span>

              <span className="hidden sm:block w-px h-4 bg-[#2a2a2a]" />

              <span className="flex items-center gap-2">
                <Shield
                  size={14}
                  className="text-emerald-400"
                />
                Secure. Trusted. Intelligent.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}