import { useState } from 'react';
import { useApp } from './AppContext';
import AuthScreen from './AuthScreen';
import DraftTab from './DraftTab';
import BingoTab from './BingoTab';
import ScoreboardTab from './ScoreboardTab';
import RulesTab from './RulesTab';

const TABS = [
  { key: 'draft', label: '🏆 Draft', Component: DraftTab },
  { key: 'bingo', label: '🎯 Bingo', Component: BingoTab },
  { key: 'scoreboard', label: '📊 Scores', Component: ScoreboardTab },
  { key: 'rules', label: '📜 Rules', Component: RulesTab },
];

export default function App() {
  const { user, authLoading, logout, syncStatus } = useApp();
  const [activeTab, setActiveTab] = useState('draft');

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-stone-950">
        <div className="text-5xl animate-flicker">🔥</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const ActiveComponent = TABS.find(t => t.key === activeTab)?.Component || DraftTab;

  return (
    <div className="min-h-screen">
      {/* User bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-stone-900 border-b border-stone-800 text-xs relative z-20">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${syncStatus === 'online' ? 'bg-jungle-400' :
              syncStatus === 'syncing' ? 'bg-torch animate-pulse-sync' :
                'bg-fire-600'
            }`} />
          <span className="text-stone-500 hidden sm:inline">
            {syncStatus === 'online' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Local'}
          </span>
        </div>
        <span className="flex-1 text-stone-500 truncate">{user.email}</span>
        <button
          onClick={logout}
          className="px-2.5 py-1 rounded border border-stone-700 text-stone-500 hover:text-fire-400 hover:border-fire-400/30 transition-all cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Header */}
      <header className="text-center pt-6 pb-2 relative z-10">
        {/* Background embers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-fire-400 animate-float-up"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '-5px',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="text-4xl mb-1 animate-flicker relative">🔥</div>
        <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-fire-400 text-glow-fire leading-none relative">
          SURVIVOR <span className="text-torch text-glow-torch text-6xl sm:text-7xl">50</span>
        </h1>
        <p className="text-stone-500 text-xs tracking-[0.3em] uppercase mt-1 relative">Watch Party HQ</p>
      </header>

      {/* Nav */}
      <nav className="flex justify-center gap-2 flex-wrap px-4 py-3 relative z-10">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap
              ${activeTab === tab.key
                ? 'bg-gradient-to-r from-fire-400 to-fire-600 text-white shadow-fire-lg border border-transparent'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200 hover:border-stone-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 relative z-10">
        <ActiveComponent />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-stone-600 text-xs relative z-10">
        Survivor 50: In the Hands of the Fans — Watch Party HQ 🏝️
      </footer>
    </div>
  );
}
