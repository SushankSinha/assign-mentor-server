import mongoose from "mongoose";

const studentData = new mongoose.Schema({
  studentName: String,
  studentDivision: Number,
  studentRoll: Number,
  studentPhoto : String,
  mentorName: {
    type: String,
    default : ""
  },
  mentorId: {
    type: Number,
    default : null
  }
});

const Student = mongoose.model("STUDENT", studentData);

export default Student;
