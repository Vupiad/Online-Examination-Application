import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    return (
        <div className="bg-background font-body text-gray-800">
            {/* <!-- Header --> */}
            <header class="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-container">
                <nav class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary scale-110" data-icon="auto_stories">auto_stories</span>
                        <span class="font-headline font-extrabold text-xl text-primary tracking-tight">The Serene Scholar</span>
                    </div>
                    <div class="flex items-center gap-6">
                        <a class="text-on-surface-variant hover:text-primary font-medium transition-colors hidden md:block" href="#">Features</a>
                        <a class="text-on-surface-variant hover:text-primary font-medium transition-colors hidden md:block" href="#">About Us</a>
                        <div class="h-6 w-px bg-outline-variant/30 hidden md:block"></div>
                        <button class="text-on-surface hover:text-primary font-semibold transition-colors" onClick={() => navigate("/login")}>
                            Sign In
                        </button>
                        <button class="px-6 h-10 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all" onClick={() => navigate("/signup")}>
                            Sign Up
                        </button>
                    </div>
                </nav>
            </header>
            <main class="pt-20">
                {/* <!-- Hero Section --> */}
                <section class="relative min-h-[85vh] flex items-center overflow-hidden bg-surface">
                    <div class="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-primary-container rounded-full blur-[120px] opacity-20"></div>
                    <div class="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-tertiary-container rounded-full blur-[120px] opacity-20"></div>
                    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                        <div class="space-y-8">
                            <div class="inline-flex items-center gap-2 px-4 py-1 bg-primary-container/30 text-primary-dim rounded-full text-sm font-bold tracking-wide">
                                <span class="relative flex h-2 w-2">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                ELEVATING THE EXAM EXPERIENCE
                            </div>
                            <h1 class="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                                Creating a <span class="text-primary">serene</span> academic space.
                            </h1>
                            <p class="text-on-surface-variant text-xl leading-relaxed max-w-xl">
                                A minimalist online examination platform that helps students focus completely and teachers manage scientifically. No more pressure, only the blooming of wisdom.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <button class="px-10 h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold rounded-xl text-lg shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                    Start Now
                                    <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                                </button>
                                <button class="px-10 h-14 bg-surface-container-high text-on-surface font-bold rounded-xl text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div class="hidden md:block relative">
                            <div class="glass-card p-4 rounded-[2rem] border border-white/40 shadow-2xl overflow-hidden">
                                <img alt="Minimalist online exam interface" class="rounded-2xl w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD99wta6JpwuM6CpLC7c9aOB2eT6KkRrQ8IaI1FO6DY8ia5V8_do4NGlepeQ4QjTIjmqJ7gcmGsaXMro3-F_zbYslS8g0H6qi8y-Q_wSVO187xmuKtL9MudFiqTA2Bmbo0eo9YgtzhkpLqriRWmUKkCS9Ha6LAecy2LD41hn8PMXzZdYWdpGS2GOJ1MfmeYLLHLkpRq3ghOC8XgMfjbzA5p561wFYgWuo_fmqZU4n6EktCJ1IdsRE8OFOLVsxCuSZz8SjQINNayTnOx" />
                            </div>
                            {/* <!-- Decorative element --> */}
                            <div class="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl shadow-xl border border-white/60 animate-bounce transition-all duration-[3000ms]">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                                        <span class="material-symbols-outlined" data-icon="timer">timer</span>
                                    </div>
                                    <div>
                                        <p class="text-xs font-bold text-outline uppercase">Time remaining</p>
                                        <p class="text-lg font-headline font-bold">45:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Stats Section --> */}
                <section class="py-16 bg-surface-container-lowest border-y border-surface-container">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div class="space-y-1">
                                <p class="text-4xl font-headline font-extrabold text-primary">1000+</p>
                                <p class="text-on-surface-variant font-medium">Students trusting us</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-4xl font-headline font-extrabold text-primary">50+</p>
                                <p class="text-on-surface-variant font-medium">Partner schools</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-4xl font-headline font-extrabold text-primary">500k+</p>
                                <p class="text-on-surface-variant font-medium">Completed exams</p>
                            </div>
                            <div class="space-y-1">
                                <p class="text-4xl font-headline font-extrabold text-primary">99.9%</p>
                                <p class="text-on-surface-variant font-medium">Uptime stability</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Features Section --> */}
                <section class="py-24 bg-surface">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-20 space-y-4">
                            <h2 class="font-headline text-4xl font-extrabold text-on-surface">One platform, two perfect experiences</h2>
                            <p class="text-on-surface-variant text-lg max-w-2xl mx-auto">We optimize the process for both teachers and learners for maximum efficiency.</p>
                        </div>
                        <div class="grid md:grid-cols-2 gap-12">
                            {/* <!-- For Students --> */}
                            <div class="p-10 rounded-[2.5rem] bg-surface-container-low border border-surface-container-high hover:border-primary/20 transition-all group">
                                <div class="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <span class="material-symbols-outlined text-on-primary-container text-3xl" data-icon="edit_note">edit_note</span>
                                </div>
                                <h3 class="font-headline text-2xl font-bold mb-4">Perfect for Students</h3>
                                <ul class="space-y-4 text-on-surface-variant">
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
                                        <span>Distraction-free exam interface for maximum focus.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
                                        <span>Automatic progress saving, no data loss worries.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
                                        <span>Receive instant detailed results and feedback.</span>
                                    </li>
                                </ul>
                            </div>
                            {/* <!-- For Teachers --> */}
                            <div class="p-10 rounded-[2.5rem] bg-secondary-container/20 border border-secondary-container/30 hover:border-secondary/20 transition-all group">
                                <div class="w-16 h-16 bg-secondary-container rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <span class="material-symbols-outlined text-on-secondary-container text-3xl" data-icon="analytics">analytics</span>
                                </div>
                                <h3 class="font-headline text-2xl font-bold mb-4">Perfect for Teachers</h3>
                                <ul class="space-y-4 text-on-surface-variant">
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span>
                                        <span>Create smart question banks with diverse formats.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span>
                                        <span>Real-time proctoring with anti-cheating alerts.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-secondary" data-icon="check_circle">check_circle</span>
                                        <span>Automated grade distribution and competency analytics.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- CTA Section --> */}
                <section class="py-24 px-6">
                    <div class="max-w-5xl mx-auto rounded-[3rem] bg-primary-dim p-12 md:p-20 text-center relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-50 -mr-32 -mt-32"></div>
                        <div class="relative z-10 space-y-8">
                            <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-on-primary">Ready to get started?</h2>
                            <p class="text-primary-fixed text-xl max-w-2xl mx-auto">Join thousands of teachers and students to experience the most modern and civilized examination environment.</p>
                            <div class="flex flex-wrap justify-center gap-4 pt-4">
                                <button class="px-10 h-16 bg-on-primary text-primary font-extrabold rounded-2xl text-lg shadow-2xl hover:scale-105 transition-all">Register for free now</button>
                                <button class="px-10 h-16 bg-primary-container/20 text-on-primary font-bold rounded-2xl text-lg border border-on-primary/20 hover:bg-primary-container/30 transition-all">Contact for advice</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <!-- Footer --> */}
            <footer class="bg-surface-container-lowest py-16 border-t border-surface-container">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid md:grid-cols-4 gap-12 mb-16">
                        <div class="col-span-2 space-y-6">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary scale-110" data-icon="auto_stories">auto_stories</span>
                                <span class="font-headline font-extrabold text-xl text-primary tracking-tight">The Serene Scholar</span>
                            </div>
                            <p class="text-on-surface-variant max-w-sm">Elevating the academic experience through technology and minimalist design. We believe that examination is a journey of discovery, not a burden.</p>
                            <div class="flex gap-4">
                                <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="#">
                                    <span class="material-symbols-outlined text-xl" data-icon="language">language</span>
                                </a>
                                <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="#">
                                    <span class="material-symbols-outlined text-xl" data-icon="share">share</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-bold mb-6">Links</h4>
                            <ul class="space-y-4 text-on-surface-variant">
                                <li><a class="hover:text-primary transition-colors" href="#">About Us</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Features</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Pricing</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-6">Support</h4>
                            <ul class="space-y-4 text-on-surface-variant">
                                <li><a class="hover:text-primary transition-colors" href="#">Help Center</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                                <li><a class="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-outline-variant">
                        <p>© 2024 The Serene Scholar. All rights reserved.</p>
                        <div class="flex gap-6">
                            <a class="hover:text-primary transition-colors" href="#">Tiếng Việt</a>
                            <a class="hover:text-primary transition-colors" href="#">English</a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Floating Help --> */}
            <div class="fixed bottom-8 right-8 z-50">
                <button class="w-14 h-14 bg-surface-container-lowest text-primary rounded-2xl shadow-xl border border-outline-variant/10 flex items-center justify-center hover:bg-primary-container transition-all group">
                    <span class="material-symbols-outlined scale-110 group-hover:rotate-12 transition-transform" data-icon="support_agent">support_agent</span>
                </button>
            </div>
        </div>
    );
}

export default Landing;