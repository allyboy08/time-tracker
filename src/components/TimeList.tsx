import React from 'react';
import { TimeEntry } from './TimeEntry';

interface Props {
  entries: TimeEntry[];
  onDelete: (id: number) => void;
}

const TimeList: React.FC<Props> = ({ entries, onDelete }) => {
  const totalTime = entries.reduce(
    (acc, entry) => {
      const totalMinutes = acc.minutes + entry.minutes;
      const extraHours = Math.floor(totalMinutes / 60);
      return {
        hours: acc.hours + entry.hours + extraHours,
        minutes: totalMinutes % 60,
      };
    },
    { hours: 0, minutes: 0 }
  );

  return (
    <div>
      <h2>Time Entries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{entry.task}</strong>: {entry.hours}h {entry.minutes}m
              <button onClick={() => onDelete(entry.id)} style={{ marginLeft: '1rem' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total Time: {totalTime.hours}h {totalTime.minutes}m</h3>
    </div>
  );
};

export default TimeList;