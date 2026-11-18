import { useState } from 'react';

function ClearData({ onClear }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" className="clear-data" onClick={() => setConfirming(true)}>
        Clear all data
      </button>
    );
  }

  return (
    <div className="clear-confirm">
      <p>Delete all your semesters and courses? This can't be undone.</p>
      <div className="clear-actions">
        <button type="button" onClick={() => setConfirming(false)}>
          Cancel
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => {
            onClear();
            setConfirming(false);
          }}
        >
          Yes, clear everything
        </button>
      </div>
    </div>
  );
}

export default ClearData;