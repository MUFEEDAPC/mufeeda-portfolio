export default function ScenePanel({
  id,
  className = '',
  depth = 0,
  children,
}) {
  return (
    <section
      id={id}
      className={`scene-panel ${className}`}
      data-depth={depth}
      style={{ '--panel-depth': depth }}
    >
      <div className="scene-panel__glass-aura" aria-hidden="true" />
      <div className="scene-panel__depth-glow" aria-hidden="true" />
      <div className="scene-panel__inner">{children}</div>
    </section>
  );
}
