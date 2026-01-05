import React from 'react';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-amber-500/20 to-transparent rounded-full blur-[100px]" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
                    <span className="text-amber-400">🕒</span>
                    <span className="text-sm font-medium text-amber-200">Time For Change</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-playfair font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200">
                    Gift Your Watch,<br />
                    Gift A Future.
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Your old watch can start a new chapter. Join our donation drive and receive a personalized
                    <span className="text-amber-400 font-semibold"> Donor Certificate </span>
                    honoring your contribution.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={onStart}
                        className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-bold text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Donate Now & Get Certificate
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                    </button>
                </div>

                <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center border-t border-white/5 pt-12">
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">500+</div>
                        <div className="text-sm text-gray-500">Watches Donated</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">₹2.5L</div>
                        <div className="text-sm text-gray-500">Value Generated</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white mb-2">100%</div>
                        <div className="text-sm text-gray-500">Transparency</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
