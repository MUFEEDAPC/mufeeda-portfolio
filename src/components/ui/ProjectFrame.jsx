import SafeImage from './SafeImage';

function displayUrl(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function ProjectFrame({ project, featured = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(180deg,rgba(79,140,255,0.08),transparent_42%),linear-gradient(180deg,#0b0d12,#08090d)] ${
        featured ? 'min-h-[280px] lg:min-h-[460px]' : 'h-56 md:h-64'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,140,255,0.12),transparent_46%)]" />

      <div
        className={`relative flex h-full items-end justify-center ${
          featured ? 'px-5 pt-8 pb-0 md:px-8 md:pt-10' : 'px-4 pt-6'
        }`}
      >
        <div className="group-hover:-translate-y-1 w-full max-w-[92%] overflow-hidden rounded-t-xl border border-white/10 bg-[#0c1018] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-500">
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/18" />
            <span className="ml-2 truncate rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-muted">
              {displayUrl(project.demo)}
            </span>
          </div>

          <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
            <SafeImage
              src={project.image}
              webp={project.imageWebp}
              alt={`${project.name} interface preview`}
              className="h-full w-full object-cover object-top opacity-70 saturate-[0.45] contrast-[1.08] transition-[transform,opacity,filter] duration-700 group-hover:scale-[1.03] group-hover:opacity-85 group-hover:saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/35 to-[#08090d]/10" />
            <div className="absolute inset-0 bg-[#4f8cff]/8 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </div>
  );
}
