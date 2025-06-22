import React, { useState, useEffect } from 'react';
import TimeForm from './components/TimeForm';
import TimeList from './components/TimeList';
import { TimeEntry } from './components/TimeEntry';

const STORAGE_KEY = 'timeEntries';

const App: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save entries to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Add a new time entry
  const handleAddEntry = (task: string, hours: number,minutes: number) => {
    const newEntry: TimeEntry = {
      id: Date.now(),
      task,
      hours,
      minutes
    };
    setEntries([...entries, newEntry]);
  };

  // Delete a time entry by id
  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Time Tracker</h1>
      <TimeForm onAdd={handleAddEntry} />
      <TimeList entries={entries} onDelete={handleDeleteEntry} />
    </div>
  );
};

export default App;