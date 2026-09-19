const ORBS = [
  { size: 180, top: '8%', left: '6%', delay: 0 },
  { size: 120, top: '55%', left: '82%', delay: 2 },
  { size: 90, top: '72%', left: '18%', delay: 4 },
  { size: 140, top: '30%', left: '70%', delay: 1 },
  { size: 70, top: '85%', left: '55%', delay: 3 },
];

export default function GlassOrbField() {
  return (
    <div className="glass-orb-field" aria-hidden="true">
      {ORBS.map((orb) => (
        <span
          key={`${orb.top}-${orb.left}`}
          className="glass-orb"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
