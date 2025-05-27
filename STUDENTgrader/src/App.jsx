// src/App.jsx
import React, { useState, useEffect } from 'react';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import Login from './components/Login'; // <-- New component

const App = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSave = () => {
    setSelectedStudent(null);
    setRefresh(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right', margin: '1rem' }}>
        Logout
      </button>
      <AddStudentForm selectedStudent={selectedStudent} onSave={handleSave} />
      <StudentList onEdit={setSelectedStudent} refresh={refresh} />
    </div>
  );
};

export default App;
