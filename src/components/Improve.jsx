import TargetPlanner from './TargetPlanner';

function Improve({ semesters }) {
  return (
    <section className="improve" aria-label="Improve">
      <TargetPlanner semesters={semesters} />
    </section>
  );
}

export default Improve;