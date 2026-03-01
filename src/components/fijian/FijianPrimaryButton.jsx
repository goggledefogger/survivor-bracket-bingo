/**
 * FijianPrimaryButton — Primary CTA with Fijian gradient
 */
export default function FijianPrimaryButton({ children, disabled, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full h-14 rounded-lg bg-gradient-to-br from-clay via-sienna to-ochre text-stone-dark text-base font-black tracking-widest uppercase shadow-2xl shadow-stone-dark/50 active:scale-[0.98] transition-all border-b-4 border-earth/40 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-default ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
