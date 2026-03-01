/**
 * Icon — Material Symbols Outlined wrapper
 */
export default function Icon({ name, className = '', ...props }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      aria-hidden
      {...props}
    >
      {name}
    </span>
  );
}
