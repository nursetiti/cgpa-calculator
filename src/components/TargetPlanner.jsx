import { useState } from 'react';
import { neededAverage, bestPossible, formatGpa } from '../utils/gpa';

function describe(need) {
  if (need >= 4.5) return "mostly A's";
  if (need >= 3.5) return "mostly B's, some A's";
  if (need >= 2.5) return "mostly C's and B's";
  return "C's or better";
}

function TargetPlanner({ semesters }) {
  const [target, setTarget] = useState('4.50');
  const [unitsLeft, setUnitsLeft] = useState('100');

  const t = parseFloat(target);
  const left = parseFloat(unitsLeft);
  const ready = t > 0 && t <= 5 && left > 0;

  let result = null;
  if (ready) {
    const need = neededAverage(semesters, t, left);

    if (need > 5) {
      result = {
        tone: 'bad',
        title: 'Not reachable',
        text: `Straight A's in ${left} units would give you ${formatGpa(bestPossible(semesters, left))}. Try a lower target.`,
      };
    } else if (need <= 0) {
      result = {
        tone: 'good',
        title: "You're there",
        text: `Pass your remaining courses and you stay above ${formatGpa(t)}.`,
      };
    } else {
      result = {
        tone: 'accent',
        title: `${formatGpa(need)} average`,
        text: `That means ${describe(need)} in your next ${left} units.`,
      };
    }
  }

  return (
    <div className="card">
      <h2>What do I need?</h2>

      <div className="field-row">
        <div className="field">
          <label htmlFor="target">Target CGPA</label>
          <input
            id="target"
            type="number"
            inputMode="decimal"
            min="1"
            max="5"
            step="0.01"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="units-left">Units left</label>
          <input
            id="units-left"
            type="number"
            inputMode="numeric"
            min="1"
            value={unitsLeft}
            onChange={(e) => setUnitsLeft(e.target.value)}
          />
        </div>
      </div>

      <div className="planner-result">
        {result ? (
          <>
            <p className={`result-title tone-${result.tone}`}>{result.title}</p>
            <p className="result-text">{result.text}</p>
          </>
        ) : (
          <p className="result-text">Enter a target between 1 and 5, and the units you have left.</p>
        )}
      </div>
    </div>
  );
}

export default TargetPlanner;