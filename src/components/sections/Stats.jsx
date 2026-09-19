import { stats } from '../../data/portfolio';
import ScenePanel from '../three/ScenePanel';
import CountUp from '../ui/CountUp';
import TiltCard from '../ui/TiltCard';

export default function Stats() {
  return (
    <ScenePanel className="section stats" depth={40}>
      <div className="container">
        <div className="stats__grid">
          {stats.map((item, i) => (
            <TiltCard key={item.label} className="stats__card glass-card" intensity={8}>
              <div className="stats__glow" aria-hidden="true" style={{ animationDelay: `${i * 0.4}s` }} />
              <span className="stats__value">
                <CountUp end={item.value} suffix={item.suffix} />
              </span>
              <span className="stats__label">{item.label}</span>
              <span className="stats__detail">{item.detail}</span>
            </TiltCard>
          ))}
        </div>
      </div>
    </ScenePanel>
  );
}
