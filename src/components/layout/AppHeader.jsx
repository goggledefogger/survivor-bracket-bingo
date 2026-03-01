/**
 * AppHeader — compact FijianHero-style (torch + wood-texture) to match AuthScreen
 */
import FijianHero from '../fijian/FijianHero';

export function AppHeader() {
  return (
    <header className="text-center pt-4 pb-2 relative z-10">
      <div className="scale-[0.55] sm:scale-75 origin-center -mt-4 -mb-6">
        <FijianHero subtitle="Watch Party HQ" />
      </div>
    </header>
  );
}
