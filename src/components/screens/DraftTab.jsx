import { useState } from 'react';
import { useApp } from '../../AppContext';
import { TRIBES, PLAYER_COLORS } from '../../data';
import { FijianCard, FijianInput, FijianPrimaryButton, FijianSectionHeader } from '../fijian';

// Snake draft order for 4 players, 6 rounds: 1-2-3-4-4-3-2-1-1-2-3-4...
function getSnakeDraftOrder(numPlayers, numRounds) {
    const order = [];
    for (let r = 0; r < numRounds; r++) {
        const round = [];
        for (let p = 0; p < numPlayers; p++) {
            round.push(r % 2 === 0 ? p : numPlayers - 1 - p);
        }
        order.push(...round);
    }
    return order;
}

export default function DraftTab() {
    const { gameState, saveGame, createGame } = useApp();
    const { players, draft } = gameState;

    const [names, setNames] = useState(players);
    const draftOrder = getSnakeDraftOrder(4, 6);

    const handleStartDraft = async () => {
        const finalNames = names.map((n, i) => n.trim() || `Player ${i + 1}`);
        const newState = {
            ...gameState,
            players: finalNames,
            draft: { started: true, completed: false, currentPick: 0, picks: {} },
        };
        if (!gameState.draft?.started) {
            await createGame(finalNames);
        }
        await saveGame(newState);
    };

    const handlePick = async (castawayId) => {
        if (!draft.started || draft.completed) return;
        const picks = { ...draft.picks, [castawayId]: draftOrder[draft.currentPick] };
        const nextPick = draft.currentPick + 1;
        const completed = nextPick >= draftOrder.length;
        await saveGame({
            ...gameState,
            draft: { ...draft, picks, currentPick: nextPick, completed },
        });
    };

    const handleResetDraft = async () => {
        await saveGame({
            ...gameState,
            draft: { started: false, completed: false, currentPick: 0, picks: {} },
        });
    };

    const currentDrafter = draft.started && !draft.completed ? draftOrder[draft.currentPick] : null;
    const currentRound = draft.started ? Math.floor(draft.currentPick / 4) + 1 : 0;

    // Get picks per player
    const playerPicks = {};
    for (const [castawayId, playerIdx] of Object.entries(draft.picks || {})) {
        if (!playerPicks[playerIdx]) playerPicks[playerIdx] = [];
        playerPicks[playerIdx].push(castawayId);
    }

    return (
        <div className="space-y-6">
            <header className="text-center">
                <h2 className="font-display text-4xl tracking-wider text-sand-warm text-shadow-glow-torch">Sevu</h2>
                <p className="text-sand-warm/60 text-sm mt-1">Season 50 Draft · Each player drafts 6 castaways</p>
            </header>

            {/* Setup or active draft indicator */}
            {!draft.started ? (
                <FijianCard className="p-6 max-w-md mx-auto">
                    <FijianSectionHeader title="Your Crew" />
                    <div className="space-y-4 mb-6">
                        {names.map((name, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: PLAYER_COLORS[i].hex }} aria-hidden />
                                <div className="flex-1">
                                    <FijianInput
                                        value={name}
                                        onChange={(e) => {
                                            const updated = [...names];
                                            updated[i] = e.target.value;
                                            setNames(updated);
                                        }}
                                        placeholder={`Player ${i + 1}`}
                                        maxLength={20}
                                        className="h-12"
                                        aria-label={`Player ${i + 1} name`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <FijianPrimaryButton onClick={handleStartDraft}>
                        Start Draft
                    </FijianPrimaryButton>
                </FijianCard>
            ) : !draft.completed ? (
                <FijianCard className="p-5 max-w-md mx-auto text-center shadow-fire border-fire-400/30">
                    <div className="font-display text-3xl tracking-wider" style={{ color: PLAYER_COLORS[currentDrafter].hex }}>
                        {players[currentDrafter]}
                    </div>
                    <p className="text-sand-warm/70 text-sm mt-1">is on the clock</p>
                    <p className="text-ochre/60 text-xs mt-2">Round {currentRound} of 6 · Pick {draft.currentPick + 1} of 24</p>
                </FijianCard>
            ) : (
                <FijianCard className="p-5 max-w-md mx-auto text-center border-jungle-400/30">
                    <p className="font-display text-2xl tracking-wider text-jungle-400">Draft Complete! 🎉</p>
                    <button
                        type="button"
                        onClick={handleResetDraft}
                        className="mt-3 px-4 py-2 text-xs rounded-lg border border-ochre/30 bg-stone-dark text-sand-warm/70 hover:text-ochre hover:border-ochre/50 transition-all cursor-pointer"
                    >
                        Reset Draft
                    </button>
                </FijianCard>
            )}

            {/* Tribe cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {Object.entries(TRIBES).map(([tribeKey, tribe]) => (
                    <FijianCard key={tribeKey} className="overflow-hidden">
                        <div
                            className="px-4 py-3 text-center font-display text-xl tracking-widest border-b-2"
                            style={{
                                borderColor: `var(--color-${tribeKey})`,
                                color: `var(--color-${tribeKey})`,
                                background: `linear-gradient(135deg, color-mix(in srgb, var(--color-${tribeKey}) 15%, transparent), transparent)`,
                            }}
                        >
                            {tribe.name} Tribe
                        </div>
                        <div className="p-2 space-y-1">
                            {tribe.members.map((c) => {
                                const draftedBy = draft.picks?.[c.id];
                                const isDrafted = draftedBy !== undefined;
                                const isClickable = draft.started && !draft.completed && !isDrafted;

                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => isClickable && handlePick(c.id)}
                                        disabled={!isClickable}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all
                      ${isDrafted ? 'opacity-40 line-through cursor-default' : ''}
                      ${isClickable ? 'hover:bg-stone-800 hover:border-stone-600 cursor-pointer' : 'cursor-default'}
                      ${!isDrafted ? 'text-stone-200' : 'text-stone-500'}
                      border border-transparent
                    `}
                                        style={isDrafted ? { borderLeftColor: PLAYER_COLORS[draftedBy]?.hex, borderLeftWidth: '3px' } : {}}
                                    >
                                        <span className="font-medium">{c.name}</span>
                                        <span className="text-xs text-stone-500">{c.seasons}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </FijianCard>
                ))}
            </div>

            {/* Draft results */}
            {draft.completed && (
                <section>
                    <FijianSectionHeader title="Draft Results" className="justify-center" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {players.map((name, idx) => {
                            const picks = playerPicks[idx] || [];
                            const allCastaways = Object.values(TRIBES).flatMap(t => t.members);
                            return (
                                <FijianCard
                                    key={idx}
                                    className="p-4"
                                    style={{ borderTopColor: PLAYER_COLORS[idx].hex, borderTopWidth: '3px' }}
                                >
                                    <h4 className="font-semibold text-sm mb-3" style={{ color: PLAYER_COLORS[idx].hex }}>
                                        {name}
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {picks.map((cId) => {
                                            const c = allCastaways.find(x => x.id === cId);
                                            return (
                                                <li key={cId} className="text-xs text-stone-400 bg-stone-800/50 px-2.5 py-1.5 rounded">
                                                    {c?.name || cId}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </FijianCard>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
