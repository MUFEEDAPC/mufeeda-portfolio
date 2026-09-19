export default function DepthGrid({ gridRef }) {
  return (
    <div className="depth-grid-wrap" aria-hidden="true">
      <div ref={gridRef} className="depth-grid" />
      <div className="depth-grid depth-grid--secondary" />
      <div className="depth-horizon" />
    </div>
  );
}
