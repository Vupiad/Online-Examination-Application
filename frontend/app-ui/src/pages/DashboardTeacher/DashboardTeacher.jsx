import "./DashboardTeacher.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex">
            {/* <!-- SideNavBar Component --> */}
            <aside class="h-screen w-64 bg-[#e8eff2] dark:bg-slate-900 flex flex-col p-4 gap-2 fixed left-0 top-0 z-50">
                <div class="mb-8 px-2 py-4">
                    <div class="flex items-center gap-3 mb-6">
                        <div
                            class="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
                            <img alt="Avatar" class="w-full h-full object-cover"
                                data-alt="professional teacher avatar illustration with soft teal background and friendly expression"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCFiceziKxuhm1hE1dTktlrY08ptWUeIoZz-MOS2Z6bUTxgNNYhS2RxIgPndYQXe-qeuYV7rDbIy7eZ_dHV6BRUYHat-UHwxlC72FNhgUyLbRgeaw-T3tQTzaB1tldxwyFqcP2Gnzzrq_amAlqwWtSOPxYFrHtdQKYnTwopEXtpDdzNGJQgCDS4stTQZUuVNwFF_KMsDrRc47la497sxD3pYDMsNEYAH7pnR3K_Ty3V2uktgmAeC7-2OgMSNr-qByA8p2oEpeU_f9L" />
                        </div>
                        <div>
                            <h2 class="font-['Be_Vietnam_Pro'] font-bold text-[#026880] text-sm">The Serene Scholar</h2>
                            <p class="text-[10px] text-secondary opacity-70">Exam Management System</p>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <p class="font-['Be_Vietnam_Pro'] font-bold text-[#026880] text-lg">Welcome, Teacher</p>
                        <p class="text-xs text-[#3f5659] opacity-80">Exam Management System</p>
                    </div>
                </div>
                <nav class="flex-1 space-y-1">
                    {/* <!-- Active Tab: Dashboard --> */}
                    <a class="flex items-center gap-3 px-4 py-3 bg-[#94dffb]/30 text-[#026880] font-semibold rounded-lg transition-all duration-300 ease-in-out"
                        href="#">
                        <span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                        <span class="text-sm">Dashboard</span>
                    </a>
                    <a class="flex items-center gap-3 px-4 py-3 text-[#3f5659] dark:text-slate-400 hover:bg-[#dbe4e9] dark:hover:bg-slate-800 rounded-lg transition-all duration-300 ease-in-out"
                        href="#">
                        <span class="material-symbols-outlined" data-icon="group">group</span>
                        <span class="text-sm">Class List</span>
                    </a>
                    <a class="flex items-center gap-3 px-4 py-3 text-[#3f5659] dark:text-slate-400 hover:bg-[#dbe4e9] dark:hover:bg-slate-800 rounded-lg transition-all duration-300 ease-in-out mt-4"
                        href="#">
                        <span class="material-symbols-outlined" data-icon="settings">settings</span>
                        <span class="text-sm">Settings</span>
                    </a>
                </nav>
                <div class="mt-auto pt-4 border-t border-outline-variant/20">
                    <button
                        class="w-full bg-primary text-on-primary py-3 rounded-full font-semibold flex items-center justify-center gap-2 mb-4 hover:bg-primary-dim transition-colors shadow-sm"
                        onClick={() => navigate("/test-builder")}>
                        <span class="material-symbols-outlined text-lg" data-icon="add">add</span>
                        <span class="text-sm">Create new test</span>
                    </button>
                    <a class="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/10 rounded-lg transition-all duration-300 ease-in-out"
                        href="#">
                        <span class="material-symbols-outlined" data-icon="logout">logout</span>
                        <span class="text-sm">Log out</span>
                    </a>
                </div>
            </aside>
            {/* <!-- Main Content Canvas --> */}
            <main class="flex-1 ml-64 p-8 bg-surface">
                {/* <!-- Header Section (Implicit TopAppBar Replacement) --> */}
                <header class="flex justify-between items-center mb-10">
                    <div>
                        <h1 class="text-3xl font-extrabold text-primary tracking-tight">Dashboard</h1>
                        <p class="text-secondary mt-1">Overview of current examination activities</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <button
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                            <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
                        </button>
                        <div class="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
                        <div
                            class="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full border border-outline-variant/10">
                            <div class="text-right">
                                <p class="text-xs font-bold text-on-surface">Prof. Nguyen Van An</p>
                                <p class="text-[10px] text-secondary">Senior Lecturer</p>
                            </div>
                            <span class="material-symbols-outlined text-primary" data-icon="account_circle"
                                style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                        </div>
                    </div>
                </header>
                {/* <!-- Metrics Bento Grid --> */}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div
                        class="bg-surface-container-lowest p-6 rounded-full border border-outline-variant/10 flex items-center gap-5">
                        <div class="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-3xl" data-icon="auto_stories">auto_stories</span>
                        </div>
                        <div>
                            <p class="text-sm text-secondary font-medium">Active tests</p>
                            <p class="text-2xl font-bold text-on-surface">12</p>
                        </div>
                    </div>
                    <div
                        class="bg-surface-container-lowest p-6 rounded-full border border-outline-variant/10 flex items-center gap-5">
                        <div
                            class="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                            <span class="material-symbols-outlined text-3xl" data-icon="person_play">person_play</span>
                        </div>
                        <div>
                            <p class="text-sm text-secondary font-medium">Students taking tests</p>
                            <p class="text-2xl font-bold text-on-surface">458</p>
                        </div>
                    </div>
                    <div
                        class="bg-surface-container-lowest p-6 rounded-full border border-outline-variant/10 flex items-center gap-5">
                        <div
                            class="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
                            <span class="material-symbols-outlined text-3xl" data-icon="verified">verified</span>
                        </div>
                        <div>
                            <p class="text-sm text-secondary font-medium">Completion today</p>
                            <p class="text-2xl font-bold text-on-surface">89%</p>
                        </div>
                    </div>
                </div>
                {/* <!-- Main Data Area (Zen Editorial Style) --> */}
                <section
                    class="bg-surface-container-lowest rounded-xl border border-outline-variant/5 shadow-sm overflow-hidden">
                    <div class="px-8 py-6 flex justify-between items-center bg-surface-container-low/50">
                        <h3 class="text-xl font-bold text-on-surface-variant flex items-center gap-2">
                            <span class="material-symbols-outlined" data-icon="list_alt">list_alt</span>
                            Recent Test List
                        </h3>
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <span
                                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm"
                                    data-icon="search">search</span>
                                <input
                                    class="pl-10 pr-4 py-2 bg-surface-container-high rounded-md text-sm border-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                                    placeholder="Search for tests..." type="text" />
                            </div>
                            <button
                                class="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-md text-sm font-medium hover:bg-surface-container-highest transition-colors">
                                <span class="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                                Filter
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr
                                    class="text-xs font-bold text-outline uppercase tracking-widest border-b border-outline-variant/10">
                                    <th class="px-8 py-5">Test Name</th>
                                    <th class="px-8 py-5 text-center">Status</th>
                                    <th class="px-8 py-5">Duration</th>
                                    <th class="px-8 py-5">Test Deadline</th>
                                    <th class="px-8 py-5">Student Count</th>
                                    <th class="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant/5">
                                {/* <!-- Row 1 --> */}
                                <tr class="hover:bg-surface-container-low/30 transition-colors group">
                                    <td class="px-8 py-6">
                                        <div>
                                            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">
                                                Midterm Exam I - Philology 12</p>
                                            <p class="text-xs text-secondary/60 mt-1">Updated 2 hours ago</p>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-center">
                                        <span
                                            class="px-3 py-1 bg-primary-container/40 text-on-primary-container text-[11px] font-bold rounded-full border border-primary-container whitespace-nowrap">Open</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex items-center gap-2 font-mono text-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded w-fit">
                                            90 min</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="text-sm text-on-surface-variant font-medium">10/10 - 15/10/2024</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-2">
                                            <span class="material-symbols-outlined text-sm text-secondary"
                                                data-icon="groups">groups</span>
                                            <span class="text-sm font-medium">42/45 students</span>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-right">
                                        <button
                                            class="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors inline-flex items-center justify-center text-outline">
                                            <span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* <!-- Row 2 --> */}
                                <tr class="hover:bg-surface-container-low/30 transition-colors group">
                                    <td class="px-8 py-6">
                                        <div>
                                            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">
                                                English Proficiency Survey (B2)</p>
                                            <p class="text-xs text-secondary/60 mt-1">Updated 1 day ago</p>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-center">
                                        <span
                                            class="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[11px] font-bold rounded-full whitespace-nowrap">Closed</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex items-center gap-2 font-mono text-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded w-fit">
                                            60 min</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="text-sm text-on-surface-variant font-medium">12/10 - 18/10/2024</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-2">
                                            <span class="material-symbols-outlined text-sm text-secondary"
                                                data-icon="groups">groups</span>
                                            <span class="text-sm font-medium">128/130 students</span>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-right">
                                        <button
                                            class="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors inline-flex items-center justify-center text-outline">
                                            <span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr class="hover:bg-surface-container-low/30 transition-colors group">
                                    <td class="px-8 py-6">
                                        <div>
                                            <p class="font-semibold text-on-surface group-hover:text-primary transition-colors">
                                                Calculus Mathematics: Integral Applications</p>
                                            <p class="text-xs text-secondary/60 mt-1">Updated 3 days ago</p>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-center">
                                        <span
                                            class="px-3 py-1 bg-primary-container/40 text-on-primary-container text-[11px] font-bold rounded-full border border-primary-container whitespace-nowrap">Open</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div
                                            class="flex items-center gap-2 font-mono text-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded w-fit">
                                            120 min</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="text-sm text-on-surface-variant font-medium">15/10 - 20/10/2024</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="flex items-center gap-2">
                                            <span class="material-symbols-outlined text-sm text-secondary"
                                                data-icon="groups">groups</span>
                                            <span class="text-sm font-medium">15/45 students</span>
                                        </div>
                                    </td>
                                    <td class="px-8 py-6 text-right">
                                        <button
                                            class="w-8 h-8 rounded-full hover:bg-surface-container-high transition-colors inline-flex items-center justify-center text-outline">
                                            <span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        class="px-8 py-6 bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant/10">
                        <p class="text-xs text-secondary">Showing 1-3 of 12 tests</p>
                        <div class="flex gap-2">
                            <button
                                class="px-3 py-1 rounded bg-surface-container text-on-surface text-sm font-medium disabled:opacity-50">Previous</button>
                            <button class="px-3 py-1 rounded bg-primary text-on-primary text-sm font-medium">1</button>
                            <button
                                class="px-3 py-1 rounded bg-surface-container text-on-surface text-sm font-medium">2</button>
                            <button
                                class="px-3 py-1 rounded bg-surface-container text-on-surface text-sm font-medium">Next</button>
                        </div>
                    </div>
                </section>
                {/* <!-- Secondary Info Area --> */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                    <div class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
                        <h4 class="font-bold text-lg mb-4 text-on-surface-variant">System Notifications</h4>
                        <div class="space-y-4">
                            <div class="flex gap-4 items-start">
                                <div class="w-2 h-2 rounded-full bg-primary mt-2"></div>
                                <div>
                                    <p class="text-sm font-semibold text-on-surface">New anti-cheating feature update</p>
                                    <p class="text-xs text-secondary mt-1">The system has added a browser tab tracking
                                        feature...</p>
                                </div>
                            </div>
                            <div class="flex gap-4 items-start">
                                <div class="w-2 h-2 rounded-full bg-error mt-2"></div>
                                <div>
                                    <p class="text-sm font-semibold text-on-surface">Periodic system maintenance</p>
                                    <p class="text-xs text-secondary mt-1">This Sunday from 02:00 to 04:00 AM...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-primary-container/20 rounded-xl p-8 border border-primary-container/30 relative overflow-hidden">
                        <div class="relative z-10">
                            <h4 class="font-bold text-lg mb-2 text-on-primary-container">Tips for teachers</h4>
                            <p class="text-sm text-on-primary-container/80 max-w-xs mb-6">Did you know that using a question
                                bank saves 40% of test creation time?</p>
                            <button
                                class="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-bold shadow-md hover:bg-primary-dim transition-all">
                                Explore Test Bank
                            </button>
                        </div>
                        <div class="absolute -right-8 -bottom-8 opacity-10">
                            <span class="material-symbols-outlined text-[160px]" data-icon="lightbulb"
                                style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;