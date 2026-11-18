import { costliestCourses, formatGpa } from '../utils/gpa';

function CostlyCourses({ semesters }) {
  const courses = costliestCourses(semesters);
  const hasCourses = semesters.some((s) => s.courses.length > 0);

  return (
    <div className="card">
      <h2>Where you lost the most</h2>
      <p className="card-hint">
        How much each course pulled your CGPA down. More units, bigger effect.
      </p>

      {courses.length > 0 ? (
        <ul className="costly-list">
          {courses.map((c) => (
            <li key={c.id}>
              <span className={`costly-grade grade-${c.grade}`}>{c.grade}</span>
              <span className="costly-info">
                <strong>{c.code || 'Untitled course'}</strong>
                <small>{c.semesterName}, {c.units} units</small>
              </span>
              <span className="costly-cost">−{formatGpa(c.cgpaCost)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="card-hint">
          {hasCourses ? "Straight A's so far. Nothing to fix!" : 'Add some courses to see this.'}
        </p>
      )}
    </div>
  );
}

export default CostlyCourses;