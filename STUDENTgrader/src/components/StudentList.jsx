import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getGradeColor = (grade) => {
  switch (grade) {
    case 'A': return 'green';
    case 'B': return 'blue';
    case 'C': return 'orange';
    case 'D': return 'darkorange';
    case 'E': return 'red';
    case 'F': return 'darkred';
    default: return 'black';
  }
};

const StudentList = ({ onEdit, refresh }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data));
  }, [refresh]);

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Are you sure you want to delete student "${name}"?`);
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      alert('Student deleted!');
      // Re-fetch the student list
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch {
      alert('Error deleting student');
    }
  };

  return (
    <div>
      <h2>All Students</h2>
      {students.map((student) => (
        <div key={student._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{student.name}</h3>
          <ul>
            {student.subjects.map((s, j) => (
              <li key={j}>{s.subject}: {s.mark}</li>
            ))}
          </ul>
          <p><strong>Average:</strong> {student.average.toFixed(2)}</p>
          <p>
            <strong>Grade:</strong>{' '}
            <span style={{ color: getGradeColor(student.grade), fontWeight: 'bold' }}>
              {student.grade}
            </span>
          </p>
          <button onClick={() => onEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id, student.name)} style={{ marginLeft: '10px', color: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
