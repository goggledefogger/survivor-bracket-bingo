import { SCORE_EVENTS } from '../../data';
import {
  FijianCard,
  FijianSectionHeader,
  Icon,
} from '../fijian';

const EVENT_ICONS = {
  survived: 'check_circle',
  immunity: 'waves',
  reward: 'card_giftcard',
  idol_found: 'local_fire_department',
  idol_played: 'diamond',
  advantage: 'extension',
  blindside: 'visibility_off',
  no_votes: 'shield',
  merge: 'groups',
  final5: 'back_hand',
  ftc: 'account_balance',
  winner: 'stars',
  voted_out: 'close',
  first_boot: 'skull',
};

export default function RulesTab() {
  return (
    <article className="max-w-2xl mx-auto space-y-8 magimagi-border-rules p-6">
      <header className="text-center py-10">
        <h1 className="font-display text-5xl text-sand-warm uppercase tracking-tighter drop-shadow-text">
          LAWA
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="h-[1px] w-8 bg-ochre/40" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-sand-warm/80 uppercase font-sans">Fijian Rules</p>
          <span className="h-[1px] w-8 bg-ochre/40" />
        </div>
      </header>

      <section>
        <FijianSectionHeader title="Sevu" subtitle="Bracket Draft" />
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="shrink-0 size-8 rounded-full border border-ochre flex items-center justify-center font-serif text-ochre font-bold">
              1
            </div>
            <div>
              <h4 className="font-serif text-lg text-sand-warm leading-none mb-1">Snake Format</h4>
              <p className="text-sm text-sand-warm/70 leading-relaxed italic">
                Standard 10-round snake draft format (1-8, then 8-1).
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 size-8 rounded-full border border-ochre flex items-center justify-center font-serif text-ochre font-bold">
              2
            </div>
            <div>
              <h4 className="font-serif text-lg text-sand-warm leading-none mb-1">Deadline</h4>
              <p className="text-sm text-sand-warm/70 leading-relaxed italic">
                Draft closes 1 hour before the season premiere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <FijianSectionHeader title="Lawa ni Qito" subtitle="Scoring" />
        <FijianCard>
          <table className="w-full text-left">
            <thead className="bg-ochre/10 border-b border-ochre/20">
              <tr>
                <th className="px-4 py-3 font-serif text-sand-warm text-lg uppercase" scope="col">
                  Event
                </th>
                <th className="px-4 py-3 font-serif text-sand-warm text-lg uppercase text-right" scope="col">
                  Toka (Pts)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ochre/10">
              {SCORE_EVENTS.slice(0, 8).map((ev) => (
                <tr key={ev.key}>
                  <td className="px-4 py-3 text-sm flex items-center gap-2">
                    <Icon name={EVENT_ICONS[ev.key] || 'circle'} className="text-ochre text-sm" />
                    {ev.label}
                  </td>
                  <td className={`px-4 py-3 text-right font-display text-2xl ${ev.negative ? 'text-stone-500' : 'text-sand-warm'}`}>
                    {ev.points > 0 ? '+' : ''}{ev.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FijianCard>
      </section>

      <section>
        <FijianSectionHeader title="Qito" subtitle="Bingo" />
        <div className="p-6 bg-ochre/5 border-2 border-dashed border-ochre/30 rounded-2xl text-center">
          <p className="font-serif text-sand-warm text-2xl italic mb-2">&quot;JEFF PROBST!&quot;</p>
          <p className="text-[10px] uppercase text-sand-warm/60 font-bold tracking-[0.2em]">
            Must be yelled at full volume to claim victory.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <div className="relative bg-stone-900/80 rounded-3xl p-8 border-2 border-ochre overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10" aria-hidden>
            <Icon name="temple_hindu" className="text-[120px] text-ochre" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col items-center mb-6 text-center">
              <Icon name="soup_kitchen" className="text-ochre text-5xl mb-2" />
              <h3 className="font-serif font-bold text-3xl text-sand-warm tracking-tight uppercase">
                Vaka-Viti
              </h3>
              <p className="text-[10px] text-ochre font-black tracking-[0.3em] uppercase">(The Fijian Way)</p>
            </div>
            <p className="text-sand-warm/80 text-center text-base leading-relaxed italic">
              Whenever the host says <span className="text-ochre font-bold">&quot;C&apos;mon in guys!&quot;</span> or{' '}
              <span className="text-ochre font-bold">&quot;Dig Deep&quot;</span>, the custom replacement for
              &quot;Cheers!&quot; is a synchronous tribe-wide salute.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
