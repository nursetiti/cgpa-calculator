const GRADES = ['A', 'B', 'C', 'D', 'E', 'F'];
const UNITS = [1, 2, 3, 4, 5, 6];

function CourseRow({ course, onChange, onRemove }) {
  return (
    <div className="course-row">
      <input
        type="text"
        aria-label="Course code"
        placeholder="e.g. CSC 201"
        value={course.code}
        onChange={(e) => onChange({ ...course, code: e.target.value.toUpperCase() })}
      />

      <select
        aria-label="Units"
        value={course.units}
        onChange={(e) => onChange({ ...course, units: Number(e.target.value) })}
      >
        {UNITS.map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      <select
        aria-label="Grade"
        value={course.grade}
        onChange={(e) => onChange({ ...course, grade: e.target.value })}
      >
        {GRADES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <button type="button" aria-label="Remove course" onClick={onRemove}>×</button>
    </div>
  );
}

export default CourseRow;