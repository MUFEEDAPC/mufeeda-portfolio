export default function SectionDivider({ label }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__label">{label}</span>
      <span className="section-divider__line" />
    </div>
  );
}
