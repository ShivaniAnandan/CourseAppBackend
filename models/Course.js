import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },  // Course Name
  title: { type: String, required: true },       // Title of the course
  img: { type: String, required: true },         // Image URL or path
  views: { type: Number, default: 0 },           // Number of views
  author: { type: String, required: true },      // Author of the course
  date: { type: Date, required: true },          // Date when the course was published
  readTime: { type: String, required: true },    // Estimated read time
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
