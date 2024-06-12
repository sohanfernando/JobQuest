const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const enrollmentSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  completionStatus: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: [contentSchema],
  enrollmentDetails: [enrollmentSchema],
  approval: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
