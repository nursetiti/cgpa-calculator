import { cgpa, totals, degreeClass, nextClass, formatGpa } from '../utils/gpa';

function Summary({ semesters }) {
  const allCourses = semesters.flatMap((s) => s.courses);
  const { units } = totals(allCourses);
  const value = cgpa(semesters);
  const current = degreeClass(value);
  const next = nextClass(value);

  // Where the marker sits on the 0–5 bar, as a percentage
  const markerLeft = `${(value / 5) * 100}%`;

  return (
    <section className="summary" aria-label="Your CGPA">
      <div className="summary-top">
        <div>
          <p className="summary-label">Current CGPA</p>
          <p className="summary-value">{formatGpa(value)}</p>
        </div>

        <div className="summary-class">
          {units === 0 ? (
            <p>Add your courses</p>
          ) : (
            <>
              <p className="class-name">{current.name}</p>
              <p className="class-next">
                {next
                  ? `${formatGpa(next.min - value)} to ${next.name}`
                  : 'Top class. Protect it!'}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="scale">
        <div className="scale-bar">
          <span style={{ flex: 1.5 }} />
          <span style={{ flex: 0.9 }} />
          <span style={{ flex: 1.1 }} />
          <span style={{ flex: 1 }} />
          <span style={{ flex: 0.5 }} />
          <span className="scale-marker" style={{ left: markerLeft }} aria-hidden="true" />
        </div>
        <div className="scale-labels">
          <span style={{ flex: 1.5 }}>0</span>
          <span style={{ flex: 0.9 }}>3rd</span>
          <span style={{ flex: 1.1 }}>2:2</span>
          <span style={{ flex: 1 }}>2:1</span>
          <span style={{ flex: 0.5 }}>1st</span>
        </div>
      </div>

      <p className="summary-units">
        {units} units across {semesters.length} semester{semesters.length === 1 ? '' : 's'}
      </p>
    </section>
  );
}

export default Summary;