import React from 'react';
import { TimeEntry } from './TimeEntry';

interface Props {
  entries: TimeEntry[];
  onDelete: (id: number) => void;
}

const TimeList: React.FC<Props> = ({ entries, onDelete }) => {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div>
      <h2>Time Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.task} - {entry.hours} hrs
            <button onClick={() => onDelete(entry.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Hours: {totalHours}</h3>
    </div>
  );
};

export default TimeList;