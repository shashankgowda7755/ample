import React from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface PreviewProps {
    userData: UserData;
    onEdit: () => void;
    onFinalize: () => void;
}

const Preview: React.FC<PreviewProps> = ({ userData, onEdit, onFinalize }) => {
    return (
        <section className="min-h-screen py-12 px-4 flex flex-col items-center animate-fade-in text-center">

            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                    Preview Your Certificate
                </h2>
                <p className="text-gray-400">Review the details below. This is a draft.</p>
            </div>

            {/* Scaled Preview Container */}
            <div className="relative w-full max-w-[400px] aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-white/10 mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* 
             We render the Poster component scaled down to fit the preview box.
             The Poster component is actually 1080x1440px. 
             We scale it down using CSS transform.
           */}
                    <div className="transform scale-[0.35] origin-top-left absolute top-0 left-0">
                        <Poster userData={userData} />
                    </div>
                </div>
                {/* Draft Overlay */}
                <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 text-xs font-bold rounded uppercase tracking-widest backdrop-blur-sm">
                    Draft
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={onEdit}
                    className="flex-1 px-8 py-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit Details
                </button>

                <button
                    onClick={onFinalize}
                    className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Finalize & Download
                </button>
            </div>

        </section>
    );
};

export default Preview;
