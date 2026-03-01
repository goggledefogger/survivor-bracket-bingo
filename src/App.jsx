import { useState } from 'react';
import { useApp } from './AppContext';
import { AuthScreen, DraftTab, BingoTab, ScoreboardTab, RulesTab } from './components/screens';
import { AppShell } from './components/layout';

const TABS = [
  { key: 'draft', fijian: 'Sevu', english: 'Draft', Component: DraftTab },
  { key: 'bingo', fijian: 'Qito', english: 'Bingo', Component: BingoTab },
  { key: 'scoreboard', fijian: 'Tovo', english: 'Scores', Component: ScoreboardTab },
  { key: 'rules', fijian: 'Lawa', english: 'Rules', Component: RulesTab },
];

export default function App() {
  const { user, authLoading } = useApp();
  const [activeTab, setActiveTab] = useState('draft');

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-stone-950">
        <div className="text-5xl animate-flicker" aria-hidden="true">🔥</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const ActiveComponent = TABS.find(t => t.key === activeTab)?.Component || DraftTab;

  return (
    <AppShell tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab}>
      <ActiveComponent />
    </AppShell>
  );
}
