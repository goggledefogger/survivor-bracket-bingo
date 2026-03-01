import { useState } from 'react';
import { useApp } from './AppContext';

export default function AuthScreen() {
    const { sendMagicLink } = useApp();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await sendMagicLink(email);
            setSent(true);
        } catch (err) {
            setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, '').trim());
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950">
            {/* Background embers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-fire-400 animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-10px',
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative bg-stone-900 border border-stone-800 rounded-2xl p-8 max-w-md w-[90%] text-center shadow-2xl">
                <div className="text-5xl mb-3 animate-flicker">🔥</div>
                <h1 className="font-display text-5xl tracking-wider text-fire-400 text-glow-fire">
                    SURVIVOR <span className="text-torch text-glow-torch">50</span>
                </h1>
                <p className="text-stone-400 text-sm tracking-widest uppercase mt-1 mb-6">Watch Party HQ</p>

                {sent ? (
                    <div className="space-y-4">
                        <div className="text-4xl">✉️</div>
                        <h2 className="font-display text-2xl tracking-wider text-torch">Check Your Email!</h2>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            We sent a magic link to <strong className="text-stone-200">{email}</strong>.
                            Click the link to sign in — no password needed!
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-fire-400 text-xs hover:underline cursor-pointer mt-2"
                        >
                            Use a different email
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <p className="text-stone-400 text-sm mb-2">Enter your email and we'll send you a magic link ✨</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-800/50 text-stone-100 placeholder-stone-500 outline-none focus:border-fire-400 transition-colors text-sm"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-fire-400 to-fire-600 text-white font-semibold hover:shadow-fire-lg transition-all cursor-pointer disabled:opacity-50 text-sm"
                        >
                            {loading ? 'Sending...' : '🔥 Send Magic Link'}
                        </button>
                    </form>
                )}

                {error && <p className="text-fire-600 text-xs mt-3">{error}</p>}
            </div>
        </div>
    );
}
