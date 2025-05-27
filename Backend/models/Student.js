// models/Student.js
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject: String,
  mark: Number,
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [SubjectSchema],
  average: Number,
  grade: String,
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
