/**
 * BingoSquare — Single bingo cell (marked/unmarked/free)
 */
export default function BingoSquare({ label, isFree, isMarked, isWinning, onClick, ...props }) {
  const base = 'aspect-square flex items-center justify-center p-2 text-center border border-sand-warm/20 transition-all cursor-pointer select-none';
  const free = 'bg-fire-400/40 border-ochre/30';
  const marked = 'bg-fire-600 shadow-inner text-sand-warm font-bold';
  const unmarked = 'bg-stone-dark border-ochre/10 text-sand-warm/70 hover:bg-stone-900/80 hover:text-sand-warm/90';

  let style = unmarked;
  if (isFree) style = free;
  else if (isMarked) style = marked;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${style} ${isWinning ? 'animate-pulse-win' : ''} text-[9px] font-medium uppercase leading-tight`}
      aria-pressed={isMarked}
      aria-label={isFree ? 'Free space' : `${label}${isMarked ? ', marked' : ''}`}
      {...props}
    >
      {label}
    </button>
  );
}
