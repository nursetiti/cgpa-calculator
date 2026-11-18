import TargetPlanner from './TargetPlanner';
import CostlyCourses from './CostlyCourses';
import GpaTrend from './GpaTrend';

function Improve({ semesters }) {
  return (
    <section className="improve" aria-label="Improve">
      <TargetPlanner semesters={semesters} />
      <CostlyCourses semesters={semesters} />
      <GpaTrend semesters={semesters} />
    </section>
  );
}
export default Improve;