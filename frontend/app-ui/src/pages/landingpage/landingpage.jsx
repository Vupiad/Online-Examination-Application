import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Timer,
  FileEdit,
  CheckCircle,
  BarChart,
  Globe,
  Share2,
  Headset,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-container">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary scale-110" size={28} />
            <span className="font-headline font-extrabold text-xl text-primary tracking-tight">
              The Serene Scholar
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-6 w-px bg-outline-variant/30 hidden md:block"></div>
            <Link
              to="/login"
              className="text-on-surface hover:text-primary font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center px-6 h-10 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface">
          <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-primary-container rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-tertiary-container rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10 py-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary-container/30 text-primary-dim rounded-full text-sm font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                ELEVATING THE EXAM EXPERIENCE
              </div>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                Creating a <span className="text-primary">serene</span> academic
                space.
              </h1>
              <p className="text-on-surface-variant text-xl leading-relaxed max-w-xl">
                A minimalist online examination platform that helps students
                focus completely and teachers manage scientifically. No more
                pressure, only the blooming of wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="px-10 h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold rounded-xl text-lg shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  Start Now
                  <ArrowRight size={24} />
                </Link>
                <button className="px-10 h-14 bg-surface-container-high text-on-surface font-bold rounded-xl text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </div>

            <div className="hidden md:block relative">
              {/* Glass Card styling directly using Tailwind */}
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-[2rem] border border-white/40 shadow-2xl overflow-hidden">
                <img
                  alt="Minimalist online exam interface"
                  className="rounded-2xl w-full"
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/60 animate-bounce transition-all duration-[3000ms]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                    <Timer size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase">
                      Time remaining
                    </p>
                    <p className="text-lg font-headline font-bold">45:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-surface-container-lowest border-y border-surface-container">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <p className="text-4xl font-headline font-extrabold text-primary">
                  1000+
                </p>
                <p className="text-on-surface-variant font-medium">
                  Students trusting us
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-headline font-extrabold text-primary">
                  50+
                </p>
                <p className="text-on-surface-variant font-medium">
                  Partner schools
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-headline font-extrabold text-primary">
                  500k+
                </p>
                <p className="text-on-surface-variant font-medium">
                  Completed exams
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-headline font-extrabold text-primary">
                  99.9%
                </p>
                <p className="text-on-surface-variant font-medium">
                  Uptime stability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="font-headline text-4xl font-extrabold text-on-surface">
                One platform, two perfect experiences
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
                We optimize the process for both teachers and learners for
                maximum efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* For Students */}
              <div className="p-10 rounded-[2.5rem] bg-surface-container-low border border-surface-container-high hover:border-primary/20 transition-all group">
                <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <FileEdit className="text-on-primary-container" size={32} />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">
                  Perfect for Students
                </h3>
                <ul className="space-y-4 text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-primary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>
                      Distraction-free exam interface for maximum focus.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-primary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>
                      Automatic progress saving, no data loss worries.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-primary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>Receive instant detailed results and feedback.</span>
                  </li>
                </ul>
              </div>

              {/* For Teachers */}
              <div className="p-10 rounded-[2.5rem] bg-secondary-container/20 border border-secondary-container/30 hover:border-secondary/20 transition-all group">
                <div className="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <BarChart className="text-on-secondary-container" size={32} />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">
                  Perfect for Teachers
                </h3>
                <ul className="space-y-4 text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-secondary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>
                      Create smart question banks with diverse formats.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-secondary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>Real-time proctoring with anti-cheating alerts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle
                      className="text-secondary shrink-0 mt-0.5"
                      size={20}
                    />
                    <span>
                      Automated grade distribution and competency analytics.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary-dim p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-50 -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-primary">
                Ready to get started?
              </h2>
              <p className="text-primary-fixed text-xl max-w-2xl mx-auto">
                Join thousands of teachers and students to experience the most
                modern and civilized examination environment.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/register"
                  className="flex items-center justify-center px-10 h-16 bg-on-primary text-primary font-extrabold rounded-2xl text-lg shadow-2xl hover:scale-105 transition-all"
                >
                  Register for free now
                </Link>
                <button className="px-10 h-16 bg-primary-container/20 text-on-primary font-bold rounded-2xl text-lg border border-on-primary/20 hover:bg-primary-container/30 transition-all">
                  Contact for advice
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-16 border-t border-surface-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary scale-110" size={28} />
                <span className="font-headline font-extrabold text-xl text-primary tracking-tight">
                  The Serene Scholar
                </span>
              </div>
              <p className="text-on-surface-variant max-w-sm">
                Elevating the academic experience through technology and
                minimalist design. We believe that examination is a journey of
                discovery, not a burden.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                >
                  <Globe size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                >
                  <Share2 size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-on-surface">Links</h4>
              <ul className="space-y-4 text-on-surface-variant">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-on-surface">Support</h4>
              <ul className="space-y-4 text-on-surface-variant">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-outline-variant">
            <p>© 2026 The Serene Scholar. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Tiếng Việt
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                English
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Help */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-surface-container-lowest text-primary rounded-2xl shadow-xl border border-outline-variant/10 flex items-center justify-center hover:bg-primary-container transition-all group">
          <Headset
            className="scale-110 group-hover:rotate-12 transition-transform"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
