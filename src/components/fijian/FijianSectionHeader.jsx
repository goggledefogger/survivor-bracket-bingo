/**
 * FijianSectionHeader — Section title with Fijian styling
 */
export default function FijianSectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`flex items-center gap-3 mb-6 border-b border-ochre/30 pb-2 ${className}`}>
      <h3 className="font-serif font-bold text-2xl text-sand-warm tracking-wide">
        {title}
        {subtitle && (
          <span className="text-sm font-sans opacity-60 text-sand-warm/80 italic tracking-normal ml-1">
            ({subtitle})
          </span>
        )}
      </h3>
    </div>
  );
}
