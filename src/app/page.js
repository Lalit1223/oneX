"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Cloud,
  BarChart3,
  Monitor,
  Wrench,
  Database,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import ParallaxBackground from "@/components/animations/ParallaxBackground";
import LoadingScreen from "@/components/animations/LoadingScreen";
import InteractiveElements from "@/components/animations/InteractiveElements";

// Mouse parallax hook directly in component
function useMouseParallax(intensity = 1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  return mousePosition;
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Mouse parallax for interactive elements
  const mouseParallax = useMouseParallax(0.01); // Reduced intensity for smoother interaction

  // EXTREME hero parallax effects like NK Studio
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -800]); // Text moves up dramatically
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]); // Fades out quickly
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]); // Shrinks dramatically
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, -15]); // Slight rotation

  // Background moves opposite direction (reverse parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 600]); // Moves down while content moves up

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const services = [
    {
      icon: Cloud,
      title: "Cloud Services",
      description:
        "Helping your business migrate to the cloud with confidence. End-to-end solutions helping you get more out of your business.",
      features: ["AWS Migration", "Azure Setup", "Cloud Architecture"],
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description:
        "We enable you to have detailed insights about your business by empowering you with the power of Data Analytics.",
      features: [
        "Business Intelligence",
        "Data Visualization",
        "Predictive Analytics",
      ],
    },
    {
      icon: Monitor,
      title: "Web & Mobile Development",
      description:
        "Every business needs an identity on the web and we are here to do just that. Equipping you with the best of technology.",
      features: ["React/Next.js", "Mobile Apps", "E-commerce"],
    },
    {
      icon: Wrench,
      title: "Application Support Services",
      description:
        "We pride ourselves on being reliable and available for our customers. We provide unmatched application support services.",
      features: ["24/7 Support", "Bug Fixes", "Performance Optimization"],
    },
    {
      icon: Database,
      title: "Data Management",
      description:
        "We understand that your data is crucial and important, managing data effectively requires having a data strategy.",
      features: ["Database Design", "Data Migration", "Backup Solutions"],
    },
    {
      icon: Zap,
      title: "Custom Solutions",
      description:
        "Tailored technology solutions designed specifically for your business needs and growth objectives.",
      features: ["Custom Software", "API Development", "Integration Services"],
    },
  ];

  return (
    <>
      <LoadingScreen />
      <Navbar />

      <main className="min-h-screen overflow-x-hidden relative">
        {/* SEO: Hidden structured data for services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              provider: {
                "@type": "Organization",
                name: "OneConnectX",
              },
              serviceType: [
                "Cloud Services",
                "Data Analytics",
                "Web Development",
                "Mobile Development",
                "Application Support",
                "Data Management",
              ],
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Technology Services",
                itemListElement: services.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: service.title,
                    description: service.description,
                  },
                })),
              },
            }),
          }}
        />
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
        >
          <ParallaxBackground />
          <InteractiveElements />

          {/* Additional moving background layer */}
          <motion.div className="absolute inset-0 z-1" style={{ y: bgY }}>
            <div className="absolute top-0 left-0 w-full h-[120%] bg-gradient-to-b from-transparent via-blue-500/5 to-purple-500/10" />
          </motion.div>

          <motion.div
            className="text-center px-4 max-w-6xl relative z-10"
            style={{
              y: heroY,
              opacity: heroOpacity,
              scale: heroScale,
              rotate: heroRotate,
            }}
            animate={{
              x: mouseParallax.x * 0.5, // Reduced mouse influence
              y: heroY.get() + mouseParallax.y * 0.3,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 40 }} // Smoother transition
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                🚀 Innovation Through Technology
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              WE ARE{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                ONECONNECTX
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We Build Innovation Through Technology for the Greater Good
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got any Ideas, Let's Get Connected!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-white/30 rounded-full text-lg font-medium hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/70" />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
          {/* Background Pattern with simple parallax */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ y: bgY }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>

          <motion.div
            className="max-w-6xl mx-auto relative z-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              variants={fadeInUp}
            >
              Trusted by Businesses Worldwide
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div variants={fadeInUp} className="group">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-blue-400 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  100+
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Projects Delivered
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="group">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-purple-400 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.2 }}
                >
                  50+
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Happy Clients
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="group">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.4 }}
                >
                  5+
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Years Experience
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="group">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-green-400 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 0.6 }}
                >
                  24/7
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  Support Available
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 px-4 bg-gray-50 relative overflow-hidden"
        >
          {/* EXTREME parallax background elements */}
          <motion.div
            className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-100 rounded-full filter blur-3xl opacity-50"
            style={{ y: useTransform(scrollYProgress, [0.2, 0.8], [0, -1000]) }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-purple-100 rounded-full filter blur-3xl opacity-50"
            style={{ y: useTransform(scrollYProgress, [0.3, 0.9], [0, 800]) }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                What We Do Best
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive technology solutions that drive
                innovation and help businesses thrive in the digital age.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 relative overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <motion.div
                        className="text-blue-600 mb-6 group-hover:text-purple-600 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent size={48} />
                      </motion.div>

                      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-2">
                        {service.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-500"
                          >
                            <Star className="w-4 h-4 text-yellow-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section
          id="technology"
          className="py-20 px-4 bg-white relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-50" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mb-4">
                Technology Stack
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Cutting-Edge Technologies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use the latest and most reliable technologies to build
                scalable, secure, and high-performance solutions.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {/* Mobile Development */}
              <motion.div
                className="text-center group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  📱
                </motion.div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Mobile Development
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    • Native iOS Development
                  </li>
                  <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    • Native Android Development
                  </li>
                  <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    • Cross-Platform (Flutter, Kotlin)
                  </li>
                  <li className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    • Hybrid Apps (Ionic, Cordova)
                  </li>
                </ul>
              </motion.div>

              {/* Web Development */}
              <motion.div
                className="text-center group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🌐
                </motion.div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Web Development
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    • PHP, Java/J2EE, Node.js
                  </li>
                  <li className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    • Python, Ruby on Rails, GoLang
                  </li>
                  <li className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    • Angular.js, React.js, Next.js
                  </li>
                  <li className="hover:text-purple-600 transition-colors duration-200 cursor-pointer">
                    • Cloud services (AWS, GCP, Azure)
                  </li>
                </ul>
              </motion.div>

              {/* Team Expertise */}
              <motion.div
                className="text-center group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  👥
                </motion.div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Our Expert Team
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                    • Software Developers
                  </li>
                  <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                    • iOS & Android Developers
                  </li>
                  <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                    • QA Engineers & Testers
                  </li>
                  <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                    • UX/UI Designers
                  </li>
                  <li className="hover:text-green-600 transition-colors duration-200 cursor-pointer">
                    • Cloud Engineers (GCP, Azure, AWS)
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose OneConnectX?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine technical expertise with creative innovation to
                deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Innovation First",
                  description:
                    "We stay ahead of technology trends to provide cutting-edge solutions.",
                  icon: "🚀",
                },
                {
                  title: "Quality Assurance",
                  description:
                    "Rigorous testing and quality control ensure flawless delivery.",
                  icon: "✅",
                },
                {
                  title: "24/7 Support",
                  description:
                    "Round-the-clock support to keep your systems running smoothly.",
                  icon: "🛟",
                },
                {
                  title: "Agile Methodology",
                  description:
                    "Fast, flexible development with regular updates and feedback.",
                  icon: "⚡",
                },
                {
                  title: "Scalable Solutions",
                  description:
                    "Built to grow with your business and adapt to changing needs.",
                  icon: "📈",
                },
                {
                  title: "Security Focus",
                  description:
                    "Enterprise-grade security measures to protect your data.",
                  icon: "🔒",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
        >
          {/* Background animation */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <motion.div
            className="max-w-5xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                Ready to Get Started?
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Have a project in mind? We'd love to hear about it. Let's discuss
              your next innovative project and bring your ideas to life with
              cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                className="group bg-white text-blue-900 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl flex items-center gap-3"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              <motion.button
                className="border-2 border-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>

            {/* Contact Info */}
            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <div className="text-2xl mb-2">📧</div>
                <p className="text-blue-200">hello@oneconnectx.com</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📱</div>
                <p className="text-blue-200">+91 XXX XXX XXXX</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🌍</div>
                <p className="text-blue-200">Global Remote Team</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">OneConnectX</h3>
                <p className="text-gray-400">
                  Building innovation through technology for the greater good.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Cloud Services</li>
                  <li>Data Analytics</li>
                  <li>Web Development</li>
                  <li>Mobile Apps</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Technologies</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>React & Next.js</li>
                  <li>Node.js & Python</li>
                  <li>AWS & Azure</li>
                  <li>Flutter & React Native</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                  <li>GitHub</li>
                  <li>Instagram</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; 2025 OneConnectX. All rights reserved. Built with ❤️ and
                Next.js
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
