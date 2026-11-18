export const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

// Degree classes, highest first (common NUC bands, check your school's)
export const CLASSES = [
  { min: 4.5, name: 'First Class' },
  { min: 3.5, name: 'Second Class Upper' },
  { min: 2.4, name: 'Second Class Lower' },
  { min: 1.5, name: 'Third Class' },
  { min: 1.0, name: 'Pass' },
  { min: 0,   name: 'Below pass' },
];

// Adds up units and quality points for a list of courses
export function totals(courses) {
  return courses.reduce(
    (acc, c) => ({
      units: acc.units + c.units,
      points: acc.points + c.units * GRADE_POINTS[c.grade],
    }),
    { units: 0, points: 0 }
  );
}

// GPA for one list of courses
export function gpa(courses) {
  const { units, points } = totals(courses);
  return units === 0 ? 0 : points / units;
}

// CGPA: all courses from all semesters, divided once
export function cgpa(semesters) {
  const allCourses = semesters.flatMap((s) => s.courses);
  return gpa(allCourses);
}

// Which class a CGPA falls into
export function degreeClass(value) {
  return CLASSES.find((c) => value >= c.min);
}

// The next class up, or null if you're already in First Class
export function nextClass(value) {
  const index = CLASSES.findIndex((c) => value >= c.min);
  return index > 0 ? CLASSES[index - 1] : null;
}

// Always show 2 decimal places: 4 → "4.00"
export function formatGpa(value) {
  return value.toFixed(2);
}

// Average grade points needed in the remaining units to reach a target CGPA
export function neededAverage(semesters, target, unitsLeft) {
  const { units, points } = totals(semesters.flatMap((s) => s.courses));
  return (target * (units + unitsLeft) - points) / unitsLeft;
}

// The best CGPA possible if every remaining unit gets an A
export function bestPossible(semesters, unitsLeft) {
  const { units, points } = totals(semesters.flatMap((s) => s.courses));
  return (points + 5 * unitsLeft) / (units + unitsLeft);
}
// The courses that pulled the CGPA down the most, biggest first
export function costliestCourses(semesters, limit = 3) {
  const allWithSemester = semesters.flatMap((s) =>
    s.courses.map((c) => ({ ...c, semesterName: s.name }))
  );

  const { units } = totals(allWithSemester);
  if (units === 0) return [];

  return allWithSemester
    .map((c) => ({ ...c, lost: c.units * (5 - GRADE_POINTS[c.grade]) }))
    .filter((c) => c.lost > 0)
    .sort((a, b) => b.lost - a.lost)
    .slice(0, limit)
    .map((c) => ({ ...c, cgpaCost: c.lost / units }));
}