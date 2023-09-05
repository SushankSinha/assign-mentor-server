import mongoose from "mongoose";

const mentorData = new mongoose.Schema({
  mentorName : String,
  mentorId : Number
});

const Mentor = mongoose.model("MENTOR", mentorData);

export default Mentor;
