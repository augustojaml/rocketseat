export function ExperienceBar() {
  return (
    <>
      <header className="experience-bar">
        <span>0 xp</span>
        <div>
          <div style={{ width: '50%' }} />
          <span className="current-experience-bar" style={{ left: '50%' }}>
            500xp
          </span>
        </div>
        <span>600 xp</span>
      </header>
    </>
  );
}
