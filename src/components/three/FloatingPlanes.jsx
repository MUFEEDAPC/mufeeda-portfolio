export default function FloatingPlanes({ planeRefs }) {
  const planes = [
    { className: 'float-plane float-plane--1', z: -400 },
    { className: 'float-plane float-plane--2', z: -600 },
    { className: 'float-plane float-plane--3', z: -300 },
    { className: 'float-plane float-plane--4', z: -500 },
  ];

  return (
    <div className="float-planes" aria-hidden="true">
      {planes.map((plane, i) => (
        <div
          key={plane.className}
          ref={(el) => {
            if (planeRefs.current) planeRefs.current[i] = el;
          }}
          className={plane.className}
          style={{ '--plane-z': `${plane.z}px` }}
        />
      ))}
    </div>
  );
}
