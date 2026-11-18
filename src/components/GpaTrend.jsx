import { gpa, formatGpa } from '../utils/gpa';

// "100 Level, First Semester" → "100L 1st"
function shortName(name) {
  return name
    .replace(' Level, First Semester', 'L 1st')
    .replace(' Level, Second Semester', 'L 2nd');
}

function GpaTrend({ semesters }) {
  const points = semesters.map((s) => ({
    id: s.id,
    label: shortName(s.name),
    value: gpa(s.courses),
  }));

  const count = points.length;
  let trend = null;
  if (count >= 2) {
    const diff = points[count - 1].value - points[count - 2].value;
    trend = {
      text: `${diff >= 0 ? 'Up' : 'Down'} ${formatGpa(Math.abs(diff))}`,
      tone: diff >= 0 ? 'good' : 'bad',
    };
  }

  const description = points.map((p) => `${p.label}: ${formatGpa(p.value)}`).join(', ');

  return (
    <div className="card">
      <div className="trend-head">
        <h2>GPA by semester</h2>
        {trend && <p className={`trend-text tone-${trend.tone}`}>{trend.text}</p>}
      </div>

      <div className="bars" role="img" aria-label={`GPA by semester. ${description}`}>
        {points.map((p, i) => (
          <div className="bar-col" key={p.id}>
            <span className="bar-value">{formatGpa(p.value)}</span>
            <span
              className={i === count - 1 ? 'bar is-latest' : 'bar'}
              style={{ height: `${Math.max(4, (p.value / 5) * 80)}px` }}
            />
          </div>
        ))}
      </div>

      <div className="bar-labels">
        {points.map((p) => (
          <span key={p.id}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

export default GpaTrend;