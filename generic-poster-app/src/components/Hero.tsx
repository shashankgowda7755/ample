
import React, { Suspense } from 'react';
import Scene3D from './Scene3D';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans transition-colors duration-300 min-h-screen flex flex-col selection:bg-primary selection:text-white">
            <header className="w-full px-6 py-4 md:px-12 flex justify-between items-center z-50 fixed top-0 left-0 glass-nav transition-all duration-300">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-primary-dark transition-colors">
                        <span className="material-symbols-outlined text-2xl">tsunami</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl leading-none text-slate-900 dark:text-white tracking-tight">Pure<span className="text-primary">Shores</span></h1>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
                    <a className="hover:text-primary transition-colors" href="#">Impact</a>
                    <a className="hover:text-primary transition-colors" href="#">Initiatives</a>
                    <a className="hover:text-primary transition-colors" href="#">Community</a>
                    <a className="hover:text-primary transition-colors" href="#">About</a>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col text-right border-r border-slate-200 dark:border-slate-700 pr-4">
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Partner</span>
                        <span className="font-bold text-sm text-slate-900 dark:text-white">GreenAlliance</span>
                    </div>
                    <button className="md:hidden p-2 text-slate-800 dark:text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <button className="hidden md:flex bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                        Donate
                    </button>
                </div>
            </header>

            <main className="flex-grow flex flex-col">
                <section className="relative h-screen w-full hero-video-container flex items-center z-10">
                    {/* 3D Background Replacement */}
                    <div className="absolute inset-0 w-full h-full bg-[#020617]">
                        <Suspense fallback={<div className="w-full h-full bg-[#020617]" />}>
                            <Scene3D />
                        </Suspense>
                    </div>

                    <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>
                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

                    <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto pt-20">
                        <div className="max-w-3xl space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-md">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                2024 Impact Report
                            </div>
                            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1]">
                                Restore. <br />
                                <span className="font-bold text-primary">Revive.</span> <br />
                                Renew.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-200 max-w-xl leading-relaxed font-light border-l-2 border-primary pl-6">
                                Join the global movement dedicated to cleaning our coastlines. Thank you for helping us save our seas, one piece of plastic at a time.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
                                <button
                                    onClick={onStart}
                                    className="flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wide uppercase text-slate-900 transition-all duration-300 bg-primary hover:bg-white hover:text-primary rounded-lg shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined mr-2">download</span>
                                    Download Certificate
                                </button>
                                {/* Removed View Dashboard button as requested */}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-20 py-8 px-6 md:px-12">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:divide-x dark:divide-slate-700">
                            <div className="flex flex-col justify-center px-4 space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined">handyman</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Projects</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">507</span>
                                    <span className="text-secondary font-bold text-lg">+</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 space-y-2">
                                <div className="flex items-center gap-2 text-secondary">
                                    <span className="material-symbols-outlined">groups</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Volunteers</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">37.6k</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 space-y-2">
                                <div className="flex items-center gap-2 text-blue-500">
                                    <span className="material-symbols-outlined">delete_sweep</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Waste Removed</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">163</span>
                                    <span className="text-xs text-slate-500 font-bold uppercase ml-1">Tons</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 space-y-2">
                                <div className="flex items-center gap-2 text-green-500">
                                    <span className="material-symbols-outlined">forest</span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Restored</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">950m</span>
                                    <sup className="text-sm font-bold text-slate-500">2</sup>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-background-light dark:bg-background-dark pt-20 pb-10 px-6 md:px-12 relative z-0">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h3 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                Making a visible <br /><span className="text-secondary decoration-4 decoration-primary underline underline-offset-4">difference.</span>
                            </h3>
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                                We believe in transparency and the power of collective action. Every cleanup is documented, verified, and added to our global database.
                            </p>
                            <a className="text-primary hover:text-secondary font-bold inline-flex items-center gap-2 group transition-colors uppercase text-sm tracking-wide" href="#">
                                Read Full Impact Report
                                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="w-full py-16 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex items-center justify-between">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Explore Initiatives</h3>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-10 h-10 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:opacity-90 transition-opacity">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="horizontal-scroll-container flex overflow-x-auto pb-12 gap-6 px-6 md:px-12 scroll-smooth">
                        <div className="min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                            <img alt="Past Events" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf3drMeqEevBs1wwSImsfPfBP3ef0tECm2DhyKXQjzNDp7Un7jcsR-5bMBiq2zR39Zar_q2V3YAp5DyuHtNbJouAnofEzrASnyn1X9p6Ji_eJdLWCpAkSTDIU7wOjyT-a2yLtlMNQ2wV7tADzpAFmYl50UuHVJF2QCqlHeoWTKmlL5dhDyjq2KumX_WCQODkjAqDp3nDxaz4JqB1yZimxPxpoU03dJGkjnJ8uede2lDiRVCWVa8_LXgtNldIxgU8DKq7H__fWnZMY" />
                            <div className="absolute inset-0 bg-card-gradient"></div>
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">History</p>
                                <h3 className="text-3xl font-serif text-white mb-2">Past Events</h3>
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    <p className="text-slate-300 text-sm mb-4">Review our gallery of previous cleanups and the impact we've made.</p>
                                    <span className="text-white text-sm font-bold border-b border-secondary pb-1 inline-block">View Gallery</span>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                            <img alt="Volunteers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp34KFrtwq8pnCSXPeWSJO5VCs-DS2dkCKq3tP0lKRA6GrDqu_XpEDlbpiqRD4bNKVnw5gh0jQoL3OuF8l-IiW4IQcZjqisv3KreI9qM3mJlVbPIJXP70uLRKdr4888reeI0sDbbl7SqwhvL04vb1HM4s1daoM42annr16C7Gxx7w2XBB456eSwPJmbTDxxQ1sHc7IWTHFLGjiR0cjIppjJeB3s26M9j6qnu9BDpNnnR1X-X4zsU8vLVeGSPKO6RbeevHqEsDXwvA" />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                            <div className="absolute inset-0 bg-card-gradient"></div>
                            <div className="absolute bottom-0 left-0 w-full p-8 border-l-4 border-primary">
                                <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Action</p>
                                <h3 className="text-3xl font-serif text-white mb-2">Join Movement</h3>
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    <p className="text-slate-300 text-sm mb-4">Sign up as a volunteer today and make a tangible difference.</p>
                                    <span className="text-white text-sm font-bold border-b border-primary pb-1 inline-block">Register Now</span>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-[320px] md:min-w-[380px] h-[500px] relative rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                            <img alt="Social Impact" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh-oZEYbGIAeesXsb0rfwEJMMMUq4SXiyh2FZI-mOptsfwYHs0jMMnWDedjyWIcLPSyRoIg31_yRnG2zpCvIGT-Ot3Cp3iDcnK0ESbybY9qSnNcS2gx5NOl3ERzvjdSGjL3i2Y7gVPjKuYBkkz2Q-jiIsIH-5KPeZ8sUfIP77l6nbQSV5vsdiOdv2vZT1z86RtTVEKcYkO0Nb78HJDo5oAUyTj4VWq7Zu32DCK4PU3ZFimLVcYoSbAj5pZmmSat2yun3jWNtx9YSk" />
                            <div className="absolute inset-0 bg-card-gradient"></div>
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <p className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-2">Community</p>
                                <h3 className="text-3xl font-serif text-white mb-2">Social Impact</h3>
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    <p className="text-slate-300 text-sm mb-4">Connect with our community and share your green achievements.</p>
                                    <span className="text-white text-sm font-bold border-b border-purple-400 pb-1 inline-block">Connect</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-slate-50 dark:bg-[#020617] text-slate-500 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                            <div className="lg:col-span-2 space-y-6 pr-8">
                                <div className="flex items-center gap-2">
                                    <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded">
                                        <span className="material-symbols-outlined text-xl">tsunami</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Pure<span className="text-primary">Shores</span></h3>
                                </div>
                                <p className="text-sm leading-relaxed max-w-sm">
                                    Restoring the ocean's natural beauty through innovation, community, and persistent action. Join over 500 active projects worldwide.
                                </p>
                                <div className="flex gap-3">
                                    {/* Social Icons */}
                                    <a className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" href="#">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                                    </a>
                                </div>
                            </div>
                            {/* Links Columns */}
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Company</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Impact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Resources</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Hero;
