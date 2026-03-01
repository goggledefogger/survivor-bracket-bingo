/**
 * BingoSquare — Single bingo cell (marked/unmarked/free)
 */
export default function BingoSquare({ label, isFree, isMarked, isWinning, onClick, ...props }) {
  const base = 'aspect-square flex items-center justify-center p-2 text-center bamboo-border transition-all cursor-pointer select-none';
  const free = 'bg-ochre/30';
  const marked = 'bg-ochre/90 shadow-inner text-stone-dark font-bold';
  const unmarked = 'bg-stone-dark text-sand-warm/70 hover:bg-stone-900/80 hover:text-sand-warm/90';

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
