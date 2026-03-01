/**
 * Button — primary, secondary, ghost variants
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export default function Button({ variant = 'secondary', disabled, className = '', children, ...props }) {
  const base = 'rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-default';
  const variants = {
    primary: 'py-3 px-4 bg-gradient-to-br from-clay via-sienna to-ochre text-stone-dark font-bold hover:shadow-lg hover:shadow-stone-950/50 text-sm',
    secondary: 'py-2 px-4 border border-stone-700 bg-stone-800 text-stone-400 hover:text-sand-warm/90 hover:border-stone-600 text-sm',
    ghost: 'py-2 px-3 text-stone-400 hover:text-ochre hover:border-ochre/40 border border-transparent',
  };
  const { type = 'button', ...rest } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
