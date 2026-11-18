import CourseRow from './CourseRow';

function SemesterCard({
  semester,
  isOpen,
  onToggle,
  onUpdateCourse,
  onRemoveCourse,
  onAddCourse,
  onRemoveSemester
}) {
  const totalUnits = semester.courses.reduce((sum, c) => sum + c.units, 0);

  return (
    <article className={`semester-card ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="semester-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>
          <strong>{semester.name}</strong>
          <small>{semester.courses.length} courses, {totalUnits} units</small>
        </span>
        <span className="semester-gpa">GPA –</span>
      </button>

      {isOpen && (
        <div className="semester-body">
          {semester.courses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              onChange={(updated) => onUpdateCourse(semester.id, updated)}
              onRemove={() => onRemoveCourse(semester.id, course.id)}
            />
          ))}
        <div className="semester-actions">
            <button
                type="button"
                className="add-course"
                onClick={() => onAddCourse(semester.id)}>
                + Add course
           </button>
          <button
            type="button"
            className="delete-semester"
            onClick={() => onRemoveSemester(semester.id)}>
            Delete semester
         </button>
        </div>
        </div>
      )}
    </article>
  );
}

export default SemesterCard;