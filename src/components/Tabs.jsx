const TABS = [
  { id: 'semesters', label: 'Semesters' },
  { id: 'improve', label: 'Improve' },
];

function Tabs({ active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Sections">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          className={active === t.id ? 'tab is-active' : 'tab'}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;