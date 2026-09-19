import { GitHubIcon } from '../ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© 2026 Mufeeda Pc. Crafted with precision.</p>
        <a
          href="https://github.com/MUFEEDAPC"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-soft transition-colors hover:text-white"
          aria-label="GitHub profile"
        >
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </footer>
  );
}
