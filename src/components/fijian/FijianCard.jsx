/**
 * FijianCard — Card with Fijian border styling
 */
export default function FijianCard({ children, className = '', style }) {
  return (
    <section className={`bg-black/20 rounded-xl overflow-hidden border border-ochre/20 ${className}`} style={style}>
      {children}
    </section>
  );
}
