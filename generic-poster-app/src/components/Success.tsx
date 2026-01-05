import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface SuccessProps {
    userData: UserData;
    onReset: () => void;
}

// Extend Window interface for html2canvas
declare global {
    interface Window {
        html2canvas: any;
    }
}

const Success: React.FC<SuccessProps> = ({ userData }) => {
    const hiddenPosterRef = useRef<HTMLDivElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    // Generate Image on Mount
    useEffect(() => {
        const generate = async () => {
            // Small delay to ensure DOM render
            await new Promise(r => setTimeout(r, 500));

            if (hiddenPosterRef.current && window.html2canvas) {
                try {
                    const canvas = await window.html2canvas(hiddenPosterRef.current, {
                        scale: 2, // High quality
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#020617', // Match poster bg
                        width: 1080,
                        height: 1440,
                        logging: false
                    });

                    const url = canvas.toDataURL('image/png');
                    setImageUrl(url);

                    // Create File object for sharing
                    const blob = await (await fetch(url)).blob();
                    const f = new File([blob], `Certificate-${userData.fullName.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
                    setFile(f);
                } catch (e) {
                    console.error("Generation failed", e);
                }
            }
            setLoading(false);
        };

        generate();
    }, [userData]);

    const handleDownload = () => {
        if (!imageUrl) return;
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = `Certificate-${userData.fullName.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleShare = async () => {
        if (file && navigator.share && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'My Clean Shores Certificate',
                    text: `I just received my certificate for being an Ocean Hero! Join the movement.`
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            handleDownload(); // Fallback
        }
    };

    const handleDonate = () => {
        const msg = encodeURIComponent("Hi, I'd like to join the next beach cleanup.");
        window.open(`https://wa.me/?text=${msg}`, '_blank');
    };

    const handleInstagram = () => {
        window.open('https://instagram.com/', '_blank');
    };

    return (
        <section className="min-h-screen py-12 px-4 flex flex-col items-center animate-fade-in text-center">

            {/* Hidden Source for Capture */}
            <div className="absolute top-0 left-[-9999px]">
                <div ref={hiddenPosterRef}><Poster userData={userData} /></div>
            </div>

            <div className="max-w-xl w-full">
                {/* Success Header */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/20 shadow-lg shadow-teal-500/10">
                        <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Certificate Ready!</h2>
                    <p className="text-gray-400">Your custom certificate has been generated.</p>
                </div>

                {/* Certificate Display */}
                <div className="glass-panel p-2 rounded-xl mb-8 border border-white/5 bg-white/5 inline-block shadow-2xl">
                    {loading ? (
                        <div className="w-[270px] h-[360px] flex items-center justify-center text-teal-500">
                            <span className="animate-pulse">Generating High Quality...</span>
                        </div>
                    ) : (
                        <img
                            src={imageUrl || ''}
                            alt="Final Certificate"
                            className="w-full max-w-[300px] h-auto rounded-lg shadow-lg"
                        />
                    )}
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button
                        onClick={handleDownload}
                        disabled={loading}
                        className="flex-1 px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Certificate
                    </button>

                    <button
                        onClick={handleShare}
                        disabled={loading}
                        className="flex-1 px-6 py-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        Share
                    </button>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-white/10 pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Donate Action */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                        <h3 className="font-bold text-lg mb-1">Create Another?</h3>
                        <p className="text-gray-400 text-sm mb-3">Make another certificate today.</p>
                        <button onClick={handleDonate} className="text-teal-400 font-bold text-sm uppercase tracking-wider hover:text-teal-300 flex items-center gap-1">
                            Volunteer Again →
                        </button>
                    </div>

                    {/* Insta Action */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                        <h3 className="font-bold text-lg mb-1">Follow Us</h3>
                        <p className="text-gray-400 text-sm mb-3">Stay updated with our latest cleanups.</p>
                        <button onClick={handleInstagram} className="text-pink-500 font-bold text-sm uppercase tracking-wider hover:text-pink-400 flex items-center gap-1">
                            Follow on Instagram →
                        </button>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Success;
