// src/App.jsx
import React, { useState } from 'react';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';


const App = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setSelectedStudent(null);
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <AddStudentForm selectedStudent={selectedStudent} onSave={handleSave} />
      <StudentList onEdit={setSelectedStudent} refresh={refresh} />
    </div>
  );
};



export default App;
