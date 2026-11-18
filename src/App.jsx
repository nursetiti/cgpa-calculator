import { useState } from 'react';
import SemesterCard from './components/SemesterCard';
import Summary from './components/Summary';

function semesterName(index) {
  const level = (Math.floor(index / 2) + 1) * 100;
  const term = index % 2 === 0 ? 'First' : 'Second';
  return `${level} Level, ${term} Semester`;
}

function App() {
  const [semesters, setSemesters] = useState([
  {
    id: crypto.randomUUID(),
    name: semesterName(0),
    courses: [{ id: crypto.randomUUID(), code: '', units: 3, grade: 'A' }],
  },
  ]);

  const [openIndex, setOpenIndex] = useState(0);

  // Update: .map() swaps in the changed course
  function updateCourse(semesterId, updatedCourse) {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.map((c) =>
            c.id === updatedCourse.id ? updatedCourse : c
          ),
        };
      })
    );
  }

  // Remove: .filter() keeps every course except this one
  function removeCourse(semesterId, courseId) {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id !== semesterId
          ? sem
          : { ...sem, courses: sem.courses.filter((c) => c.id !== courseId) }
      )
    );
  }

  // Add: spread the old courses, then add the new one at the end
  function addCourse(semesterId) {
    const newCourse = { id: crypto.randomUUID(), code: '', units: 3, grade: 'A' };
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id !== semesterId
          ? sem
          : { ...sem, courses: [...sem.courses, newCourse] }
      )
    );
  }

  function addSemester() {
    const newSemester = {
      id: crypto.randomUUID(),
      name: semesterName(semesters.length),
      courses: [{ id: crypto.randomUUID(), code: '', units: 3, grade: 'A' }],
    };

    setSemesters((prev) => [...prev, newSemester]);
    setOpenIndex(semesters.length);
  }
  function removeSemester(semesterId) {
    setSemesters((prev) => prev.filter((sem) => sem.id !== semesterId));
    setOpenIndex(-1);
}
  return (
    <main className="app">
      <header className="topbar">
        <h1>CGPA</h1>
        <span>5.0 scale</span>
      </header>

      <Summary semesters={semesters} />

      <section className="semesters">
        {semesters.map((semester, index) => (
          
          <SemesterCard
            key={semester.id}
            semester={semester}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            onUpdateCourse={updateCourse}
            onRemoveCourse={removeCourse}
            onRemoveSemester={removeSemester}
            onAddCourse={addCourse}
          />
        ))}
        <button type="button" className="add-semester" onClick={addSemester}>
          Add {semesterName(semesters.length)}
        </button>
      </section>
    </main>
  );
}

export default App;