
import React from 'react';
import { UserData } from '../types';

interface PosterProps {
    userData: UserData;
    innerRef?: React.RefObject<HTMLDivElement>;
}

const Poster: React.FC<PosterProps> = ({ userData, innerRef }) => {
    const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

    return (
        <div
            ref={innerRef}
            style={{
                width: '1080px',
                height: '1440px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#020617', // background-dark
                fontFamily: "'Playfair Display', serif",
            }}
        >
            {/* Ocean Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900/50" />

            {/* Decorative Waves/Circles */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

            {/* Frame Borders */}
            <div className="absolute inset-8 border-[2px] border-white/20 rounded-3xl" />
            <div className="absolute inset-10 border-[1px] border-teal-500/30 rounded-[20px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-32 px-16 text-center h-full">

                {/* Logo / Header */}
                <div className="mb-16 flex flex-col items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/10">
                        {/* Simple Tsunami Icon SVG */}
                        <svg className="w-16 h-16 text-teal-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.22-7.52-3.22L12 2l-7.5 13.5z" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-widest uppercase font-sans">Pure<span className="text-teal-400">Shores</span></h2>
                </div>

                {/* Title */}
                <div className="mb-12">
                    <span className="block text-teal-400 tracking-[0.4em] text-lg font-sans mb-6 uppercase font-bold">This certifies that</span>
                    <h1 className="text-6xl text-white font-black leading-tight inline-block">
                        CERTIFICATE OF<br />APPRECIATION
                    </h1>
                </div>

                {/* Photo */}
                <div className="relative mb-14">
                    <div className="w-[400px] h-[400px] rounded-full p-2 border border-teal-500/30 bg-teal-500/5 backdrop-blur-sm">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal-400">
                            <img
                                src={userData.photo || defaultAvatar}
                                className="w-full h-full object-cover"
                                alt="Volunteer"
                            />
                        </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-10 py-3 rounded-full border-4 border-slate-900 shadow-xl flex items-center gap-2">
                        <span className="text-2xl">🌊</span>
                        <span className="uppercase tracking-wider text-xl">Ocean Hero 2024</span>
                    </div>
                </div>

                {/* Name & Message */}
                <div className="text-center max-w-4xl">
                    <p className="text-gray-400 text-2xl mb-4 italic font-sans font-light">is proudly presented to</p>
                    <h2 className="text-7xl text-white mb-10 font-bold tracking-tight drop-shadow-lg">{userData.fullName}</h2>

                    <p className="text-3xl text-gray-300 leading-relaxed font-sans font-light px-12">
                        "For your dedicated contribution to keeping our shores pure, protecting marine life, and inspiring your community."
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-auto mb-20 flex items-center justify-between w-full px-20 border-t border-white/10 pt-10">
                    <div className="text-left">
                        {/* Signature Line */}
                        <div className="border-b border-gray-500 w-64 mb-2 pb-2">
                            <span className="font-dancing text-4xl text-teal-400/80 font-cursive" style={{ fontFamily: 'cursive' }}>Sarah Jenkins</span>
                        </div>
                        <p className="text-gray-500 text-base mt-2 font-sans uppercase tracking-widest font-bold">Program Director</p>
                    </div>

                    <div className="text-right">
                        <div className="border-b border-gray-500 w-64 mb-2 pb-2">
                            <span className="text-xl text-white/80 font-sans">January 2024</span>
                        </div>
                        <p className="text-gray-500 text-base mt-2 font-sans uppercase tracking-widest font-bold">Date</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Poster;
