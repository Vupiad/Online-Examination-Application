function DashboardStudent() {
    return (
        <div>
            {/* <!-- SideNavBar Component --> */}
            <aside
                class="h-screen w-64 fixed left-0 top-0 bg-[#e8eff2] dark:bg-slate-800 flex flex-col p-6 gap-2 font-['Inter'] leading-[1.6] transition-all duration-300">
                <div class="mb-10 flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                        <span class="material-symbols-outlined">auto_stories</span>
                    </div>
                    <div>
                        <h1 class="text-lg font-black text-[#026880] dark:text-[#94dffb] leading-tight">The Serene Scholar</h1>
                        <p class="text-xs text-[#3f5659] opacity-70">Student Portal</p>
                    </div>
                </div>
                <nav class="space-y-1">
                    {/* <!-- Active Tab: Dashboard --> */}
                    <a class="flex items-center gap-3 px-4 py-3 bg-[#94dffb] dark:bg-[#026880]/30 text-[#026880] dark:text-[#94dffb] rounded-lg font-bold ease-in-out transform transition-all duration-300"
                        href="#">
                        <span class="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </a>
                    {/* <!-- Inactive Tab: Take a New Test --> */}
                    <a class="flex items-center gap-3 px-4 py-3 text-[#3f5659] dark:text-slate-400 hover:bg-[#dbe4e9] dark:hover:bg-slate-700/50 rounded-lg ease-in-out transform hover:translate-x-1 transition-all duration-300"
                        href="#">
                        <span class="material-symbols-outlined">assignment_add</span>
                        <span>Take a New Test</span>
                    </a>
                    {/* <!-- Inactive Tab: Settings --> */}
                    <a class="flex items-center gap-3 px-4 py-3 text-[#3f5659] dark:text-slate-400 hover:bg-[#dbe4e9] dark:hover:bg-slate-700/50 rounded-lg ease-in-out transform hover:translate-x-1 transition-all duration-300"
                        href="#">
                        <span class="material-symbols-outlined">settings</span>
                        <span>Settings</span>
                    </a>
                </nav>
                <div class="mt-auto pt-6">
                    <div class="bg-surface-container-low rounded-xl p-4 flex items-center gap-3">
                        <img alt="Student Profile Avatar" class="w-10 h-10 rounded-full border-2 border-white"
                            data-alt="headshot of a young student with a friendly expression, soft natural indoor lighting, professional but approachable aesthetic"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIEZ3KE33NG2LuJV2XcgbA5BfxLvRjO27PWqIU8zppLHZi1wPmPht_8efaB-Oc-YBvQM_wmluYpyhQXi6gw7C2agYL8gp_avYLCWOg5prG1ZKwiVt2aeyFW403TWJ2SBM7MfuL14AIkuQgcVhnzSnddz4SWWfHV-dYCFgX7FwG-w5IZJC5hOErk35iZ7t9Et2ph3VnOanzJHsV8Cx5Yy3SenYV2zhwMCEr6VX3EpQkHdu40Qa0wkLQAko9imNYdNpWEqMccblwGkFt" />
                        <div class="overflow-hidden">
                            <p class="text-sm font-bold truncate">Nguyen Minh Tam</p>
                            <p class="text-xs text-on-surface-variant">Class 12A1</p>
                        </div>
                    </div>
                </div>
            </aside>
            {/* <!-- Main Content Canvas --> */}
            <main class="ml-64 min-h-screen">
                {/* <!-- TopNavBar Component --> */}
                <header class="w-full top-0 sticky bg-[#f7fafc] dark:bg-slate-900 z-10">
                    <div class="flex justify-between items-center px-8 py-4 w-full bg-[#eff4f7] dark:bg-slate-800/50">
                        <div class="flex items-center gap-8">
                            <h2
                                class="font-['Be_Vietnam_Pro'] tracking-tight text-xl font-bold text-[#026880] dark:text-[#94dffb]">
                                Dashboard</h2>
                            <div class="hidden md:flex gap-6">
                                <a class="text-[#026880] dark:text-[#94dffb] font-semibold text-sm" href="#">Overview</a>
                                <a class="text-[#2b3437] dark:text-slate-400 hover:text-[#026880] transition-colors duration-200 text-sm"
                                    href="#">Study Materials</a>
                                <a class="text-[#2b3437] dark:text-slate-400 hover:text-[#026880] transition-colors duration-200 text-sm"
                                    href="#">Notifications</a>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <button
                                class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors">
                                <span class="material-symbols-outlined">notifications</span>
                            </button>
                            <button
                                class="bg-primary text-on-primary px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-sm">add</span>
                                New Test
                            </button>
                        </div>
                    </div>
                </header>
                {/* <!-- Page Content --> */}
                <div class="px-8 py-10 max-w-6xl mx-auto space-y-12">
                    {/* <!-- Bento Stats Grid --> */}
                    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            class="md:col-span-2 bg-surface-container-lowest rounded-full p-8 flex flex-col justify-between min-h-[220px]">
                            <div>
                                <h3 class="font-headline text-2xl font-bold text-primary mb-2">Good morning, Tam!</h3>
                                <p class="text-on-surface-variant max-w-md">You have completed <span
                                    class="font-bold text-on-surface">85%</span> of your study goals for this month. Keep up
                                    the good work!</p>
                            </div>
                            <div class="flex gap-4 items-center mt-6">
                                <div class="flex -space-x-3">
                                    <div
                                        class="w-10 h-10 rounded-full border-2 border-white bg-primary-container flex items-center justify-center text-xs font-bold text-primary">
                                        MT</div>
                                    <div
                                        class="w-10 h-10 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-xs font-bold text-secondary">
                                        HN</div>
                                    <div
                                        class="w-10 h-10 rounded-full border-2 border-white bg-surface-variant flex items-center justify-center text-xs font-bold text-on-surface-variant">
                                        +4</div>
                                </div>
                                <span class="text-xs text-on-surface-variant">You are leading your study group</span>
                            </div>
                        </div>
                        <div
                            class="bg-primary text-on-primary rounded-full p-8 flex flex-col justify-between relative overflow-hidden">
                            <div class="relative z-10">
                                <p class="text-sm opacity-80 mb-1">Average score</p>
                                <h4 class="text-5xl font-black">8.4</h4>
                            </div>
                            <div class="relative z-10 flex items-center gap-2 text-sm">
                                <span class="material-symbols-outlined text-sm">trending_up</span>
                                <span>+0.3 compared to last month</span>
                            </div>
                            {/* <!-- Decorative background graphic --> */}
                            <div class="absolute -right-4 -bottom-4 opacity-20">
                                <span class="material-symbols-outlined text-[120px]">equalizer</span>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Completed Exams Section --> */}
                    <section class="space-y-6">
                        <div class="flex justify-between items-end">
                            <div>
                                <h3 class="font-headline text-3xl font-extrabold tracking-tight">List of your tests</h3>
                                <p class="text-on-surface-variant">Overview of completed tests and results achieved.</p>
                            </div>
                            <button class="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                                View all <span class="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                        <div class="bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/15">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="bg-surface-container border-b border-outline-variant/10">
                                            <th
                                                class="px-8 py-5 text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                                TEST NAME</th>
                                            <th
                                                class="px-6 py-5 text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                                DATE</th>
                                            <th
                                                class="px-6 py-5 text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                                DURATION</th>
                                            <th
                                                class="px-6 py-5 text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                                                STATUS</th>
                                            <th
                                                class="px-6 py-5 text-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">
                                                SCORE</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-outline-variant/5">
                                        {/* <!-- Row 1 --> */}
                                        <tr
                                            class="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div
                                                        class="w-10 h-10 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary">
                                                        <span class="material-symbols-outlined">functions</span>
                                                    </div>
                                                    <div>
                                                        <p class="font-bold text-on-surface">Calculus - Chapter 3</p>
                                                        <p class="text-xs text-on-surface-variant">Code: TH-G3-2024</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">15/10/2023</td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">45 mins</td>
                                            <td class="px-6 py-6">
                                                <span
                                                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#94dffb]/40 text-[#005063]">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-[#026880]"></span>
                                                    Submitted
                                                </span>
                                            </td>
                                            <td class="px-6 py-6 text-right font-headline text-lg font-bold text-on-surface">9.0
                                            </td>
                                        </tr>
                                        {/* <!-- Row 2 --> */}
                                        <tr class="bg-surface hover:bg-surface-container-low transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div
                                                        class="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                                                        <span class="material-symbols-outlined">language</span>
                                                    </div>
                                                    <div>
                                                        <p class="font-bold text-on-surface">Literature - Social Discourse</p>
                                                        <p class="text-xs text-on-surface-variant">Code: NV-NL-2023</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">12/10/2023</td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">90 mins</td>
                                            <td class="px-6 py-6">
                                                <span
                                                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                    Completed
                                                </span>
                                            </td>
                                            <td class="px-6 py-6 text-right font-headline text-lg font-bold text-on-surface">8.5
                                            </td>
                                        </tr>
                                        {/* <!-- Row 3 --> */}
                                        <tr
                                            class="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div
                                                        class="w-10 h-10 rounded-lg bg-tertiary-container/40 flex items-center justify-center text-tertiary">
                                                        <span class="material-symbols-outlined">biotech</span>
                                                    </div>
                                                    <div>
                                                        <p class="font-bold text-on-surface">Physics - Optics</p>
                                                        <p class="text-xs text-on-surface-variant">Code: VL-QH-002</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">05/10/2023</td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">60 mins</td>
                                            <td class="px-6 py-6">
                                                <span
                                                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                                    Completed
                                                </span>
                                            </td>
                                            <td class="px-6 py-6 text-right font-headline text-lg font-bold text-on-surface">7.8
                                            </td>
                                        </tr>
                                        {/* <!-- Row 4 --> */}
                                        <tr class="bg-surface hover:bg-surface-container-low transition-colors group">
                                            <td class="px-8 py-6">
                                                <div class="flex items-center gap-4">
                                                    <div
                                                        class="w-10 h-10 rounded-lg bg-primary-container/30 flex items-center justify-center text-primary">
                                                        <span class="material-symbols-outlined">public</span>
                                                    </div>
                                                    <div>
                                                        <p class="font-bold text-on-surface">English - IELTS Simulation</p>
                                                        <p class="text-xs text-on-surface-variant">Code: EN-IELTS-01</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">28/09/2023</td>
                                            <td class="px-6 py-6 text-sm text-on-surface-variant">120 mins</td>
                                            <td class="px-6 py-6">
                                                <span
                                                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#94dffb]/40 text-[#005063]">
                                                    <span class="w-1.5 h-1.5 rounded-full bg-[#026880]"></span>
                                                    Submitted
                                                </span>
                                            </td>
                                            <td class="px-6 py-6 text-right font-headline text-lg font-bold text-on-surface">8.0
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Learning Recommendation Card --> */}
                    <section class="bg-surface-container-high rounded-full p-10 flex flex-col md:flex-row items-center gap-10">
                        <div
                            class="w-48 h-48 flex-shrink-0 bg-white rounded-full flex items-center justify-center p-2 shadow-sm">
                            <img alt="Study Material" class="w-full h-full object-cover rounded-full"
                                data-alt="aesthetic overhead shot of open textbook, glasses, and a steaming cup of tea on a clean white desk, tranquil studying atmosphere"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm4p0Wm26UXNx4lZ5px_0fWTBA7lEhKOkGCFaA3os0EKzERXGYVbxo9abDooS_mvoVRadsbKhFf51iQTPulhfA1ZR8g80Gl4DV9vu7C9xbFdwcBCcQSbZNbxphdwv469oY9XhCnyTUZq85cABD-LuFeMn1ylHljwm6Qya9MjSroQGE05_FyXXQgaX0nOf_wns2iFu4RMXis3ZOiGKYUgSrBRnX399zu0kBdhTNvAHuWEBZQDvitPynKKmBshxn2wek7F31yyMqLnYB" />
                        </div>
                        <div class="flex-grow text-center md:text-left">
                            <span class="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3 block">RECOMMENDATION
                                FOR YOU</span>
                            <h3 class="font-headline text-2xl font-bold mb-4">Improve your Calculus skills</h3>
                            <p class="text-on-surface-variant mb-6 text-balance">Based on your latest test results, we suggest
                                you review Higher-Order Derivatives to optimize your score for the upcoming semester exam.</p>
                            <div class="flex flex-wrap justify-center md:justify-start gap-4">
                                <button
                                    class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">View
                                    roadmap</button>
                                <button
                                    class="bg-white text-on-surface px-8 py-3 rounded-full font-bold border border-outline-variant/20 hover:bg-surface-container transition-colors">Later</button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            {/* <!-- Contextual FAB --> */}
            <button
                class="fixed bottom-8 right-8 w-16 h-16 bg-[#026880] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-20">
                <span class="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>
    )
}

export default DashboardStudent;