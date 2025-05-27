// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Grade logic
function calculateGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  if (avg >= 60) return 'D';
  if (avg >= 50) return 'E';
  return 'F';
}

// POST /api/students
router.post('/', async (req, res) => {
  try {
    const { name, subjects } = req.body;
    const marks = subjects.map(s => parseFloat(s.mark));
    const average = marks.reduce((a, b) => a + b, 0) / marks.length;
    const grade = calculateGrade(average);

    const newStudent = new Student({ name, subjects, average, grade });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving student' });
  }
});

// GET /api/students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// PUT /api/students/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, subjects } = req.body;
    const marks = subjects.map(s => parseFloat(s.mark));
    const average = marks.reduce((a, b) => a + b, 0) / marks.length;

    const calculateGrade = (avg) => {
      if (avg >= 90) return 'A';
      if (avg >= 80) return 'B';
      if (avg >= 70) return 'C';
      if (avg >= 60) return 'D';
      if (avg >= 50) return 'E';
      return 'F';
    };

    const grade = calculateGrade(average);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, subjects, average, grade },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating student' });
  }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting student' });
  }
});


module.exports = router;
