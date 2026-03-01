import { useState } from 'react';
import { useApp } from './AppContext';

export default function AuthScreen() {
    const { login, register, loginWithGoogle } = useApp();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isRegister) {
                await register(email, password);
            } else {
                await login(email, password);
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''));
        }
        setLoading(false);
    };

    const handleGoogle = async () => {
        setError('');
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''));
        }
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

                <button
                    onClick={handleGoogle}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 hover:border-stone-600 transition-all cursor-pointer text-sm"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div className="flex items-center gap-3 my-5 text-stone-600 text-xs">
                    <div className="flex-1 h-px bg-stone-800" />
                    or
                    <div className="flex-1 h-px bg-stone-800" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-800/50 text-stone-100 placeholder-stone-500 outline-none focus:border-fire-400 transition-colors text-sm"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-lg border border-stone-700 bg-stone-800/50 text-stone-100 placeholder-stone-500 outline-none focus:border-fire-400 transition-colors text-sm"
                        required
                        minLength={6}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-fire-400 to-fire-600 text-white font-semibold hover:shadow-fire-lg transition-all cursor-pointer disabled:opacity-50 text-sm"
                    >
                        {loading ? '...' : isRegister ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                {error && <p className="text-fire-600 text-xs mt-3">{error}</p>}

                <p className="text-stone-500 text-xs mt-4">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={() => setIsRegister(!isRegister)} className="text-fire-400 hover:underline cursor-pointer">
                        {isRegister ? 'Sign in' : 'Create one'}
                    </button>
                </p>
            </div>
        </div>
    );
}
