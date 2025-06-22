import React, { useState } from 'react';

interface Props {
  onAdd: (task: string, hours: number,minutes: number) => void;
}

const TimeForm: React.FC<Props> = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [hourValue, setHourValue] = useState('');
  const [minuteValue, setMinuteValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    const hours = parseInt(hourValue, 10) || 0;
    const minutes = parseInt(minuteValue, 10) || 0;

    if (!trimmedTask) {
    alert('Task name cannot be empty.');
    return;
  }

  if (hours < 0 || hours > 24 || minutes < 0 || minutes >= 60) {
    alert('Please enter valid hours (0–24) and minutes (0–59).');
    return;
  }

  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes <= 0) {
    alert('Time must be greater than zero.');
    return;
  }

  if (totalMinutes > 1440) {
    alert('Total time per entry cannot exceed 24 hours.');
    return;
  }

  onAdd(trimmedTask, hours, minutes);

    setTask('');
    setHourValue('');
    setMinuteValue('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hours"
          value={hourValue}
          onChange={(e) => setHourValue(e.target.value)}
          min={0}
          max={24}
          style={{ width: '60px' }}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minuteValue}
          onChange={(e) => setMinuteValue(e.target.value)}
          min={0}
          max={59}
          step={5}
          style={{ width: '60px' }}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default TimeForm;