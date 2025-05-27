// src/components/AddStudentForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddStudentForm = ({ selectedStudent, onSave }) => {
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', mark: '' }]);

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setSubjects(selectedStudent.subjects);
    }
  }, [selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, subjects };

    try {
      if (selectedStudent) {
        await axios.put(`http://localhost:5000/api/students/${selectedStudent._id}`, payload);
        alert('Student updated!');
      } else {
        await axios.post('http://localhost:5000/api/students', payload);
        alert('Student saved!');
      }
      setName('');
      setSubjects([{ subject: '', mark: '' }]);
      onSave();
    } catch {
      alert('Error saving student');
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: '', mark: '' }]);
  };

  return (
    <form className='form-user' onSubmit={handleSubmit}>
      <h2>{selectedStudent ? 'Edit Student' : 'Add Student'}</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Student Name" required />
      {subjects.map((s, i) => (
        <div key={i}>
          <input
            value={s.subject}
            onChange={e => handleSubjectChange(i, 'subject', e.target.value)}
            placeholder="Subject"
            required
          />
          <input
            value={s.mark}
            onChange={e => handleSubjectChange(i, 'mark', e.target.value)}
            placeholder="Mark"
            type="number"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addSubject}>+ Add Subject</button>
      <button type="submit">{selectedStudent ? 'Update' : 'Submit'}</button>
    </form>
  );
};




export default AddStudentForm;
