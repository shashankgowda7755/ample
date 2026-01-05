import React, { useState, useEffect } from 'react';
import { UserData } from '../types';

interface UserFormProps {
    onSubmit: (data: UserData) => void;
    onBack: () => void;
    initialData: UserData;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onBack, initialData }) => {
    const [data, setData] = useState<UserData>(initialData);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setData(prev => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-in">
            <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400" />

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Volunteer Registration</h2>
                    <p className="text-gray-400 text-sm">Enter your details for the certificate</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Photo Upload */}
                    <div className="flex flex-col items-center">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative group transition-all ${data.photo ? 'border-primary' : 'border-slate-600 hover:border-primary'
                                }`}
                        >
                            {data.photo ? (
                                <>
                                    <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-medium">Change</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <span className="text-2xl block mb-1">📸</span>
                                    <span className="text-xs text-gray-400">Upload Photo</span>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Full Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                value={data.fullName}
                                onChange={e => setData({ ...data, fullName: e.target.value })}
                                placeholder="Enter your full name"
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Phone <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData({ ...data, phone: e.target.value })}
                                    placeholder="+91 99999 99999"
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all placeholder-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-1.5">Email <span className="text-red-500">*</span></label>
                                <input
                                    required
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData({ ...data, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Privacy Policy */}
                    <div className="flex items-start gap-3 pt-2">
                        <input
                            type="checkbox"
                            required
                            id="privacy"
                            className="mt-1 w-4 h-4 rounded border-slate-600 text-primary focus:ring-primary bg-slate-800/50"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-400">
                            I agree to the <a href="/privacy-policy.html" target="_blank" className="text-primary hover:text-primary-dark underline">Privacy Policy</a> and consent to using my photo for this certificate.
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 px-6 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-medium transition-all"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Generate Certificate
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default UserForm;
