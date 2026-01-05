import React, { useState, useRef } from 'react';
import { UserData } from '../types';

interface PosterProps {
    userData: UserData;
    innerRef?: React.RefObject<HTMLDivElement>;
}

const Poster: React.FC<PosterProps> = ({ userData, innerRef }) => {
    const defaultAvatar = "data:image/svg+xml,..."; // (Shortened for brevity)

    return (
        <div
            ref={innerRef}
            style={{
                width: '1080px',
                height: '1440px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#050505',
                fontFamily: "'Playfair Display', serif",
            }}
        >
            {/* Luxury Dark Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

            {/* Golden Accents */}
            <div className="absolute inset-0 border-[20px] border-double border-amber-600/30" />
            <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-amber-500/50 rounded-tl-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-amber-500/50 rounded-br-3xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-32 px-16 text-center h-full">

                {/* Title */}
                <div className="mb-12">
                    <span className="block text-amber-500 tracking-[0.3em] text-xl font-sans mb-4 uppercase">Certificate of Appreciation</span>
                    <h1 className="text-6xl text-white font-black leading-tight border-b-2 border-amber-500/50 pb-8 inline-block">
                        WATCH DONOR
                    </h1>
                </div>

                {/* Photo */}
                <div className="relative mb-16">
                    <div className="w-[450px] h-[450px] rounded-full p-2 border border-amber-500/30">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-amber-600 bg-gray-800">
                            <img
                                src={userData.photo || defaultAvatar}
                                className="w-full h-full object-cover"
                                alt="Donor"
                            />
                        </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-amber-600 text-black font-bold px-8 py-2 rounded-full border-4 border-black">
                        2025 DONOR
                    </div>
                </div>

                {/* Name & Message */}
                <div className="text-center max-w-3xl">
                    <p className="text-gray-400 text-2xl mb-4 italic font-sans">Presented to</p>
                    <h2 className="text-6xl text-amber-100 mb-8 font-bold tracking-wide">{userData.fullName}</h2>

                    <p className="text-2xl text-gray-300 leading-relaxed font-sans font-light">
                        "For your generous contribution of the <span className="text-amber-400">{userData.watchModel || "Timepiece"}</span>.
                        Your gift helps us create a timeless impact."
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-auto mb-24 flex items-center justify-between w-full px-12 border-t border-white/10 pt-8">
                    <div className="text-left">
                        <div className="h-12 w-32 bg-contain bg-no-repeat bg-left opacity-80" style={{ backgroundImage: 'url(/signature.png)' }}></div>
                        <p className="text-gray-500 text-sm mt-2 font-sans uppercase tracking-widest">Director</p>
                    </div>

                    <div className="text-right">
                        <p className="text-amber-500 text-lg font-bold font-sans">WATCH DONATION DRIVE</p>
                        <p className="text-gray-600 text-sm mt-1 font-sans">EST. 2025</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Poster;
