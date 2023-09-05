import express from 'express';
import Mentor from '../Models/mentorSchema.js';
import Student from '../Models/studentSchema.js';

const router = express.Router();

router.get('/about-students', async (req, res) => {
  try
  {
    const details = await Student.find()
    if(!details){
      res.status(401).json({message : "Data not found"})
    }else{
  res.send(details)
    }
}catch(err){
  console.log(err)
}
} )

router.get('/mentor-details/:id', async (req, res) => {

  const id = req.params.id;

  try {
      const mentorDetails = await Student.find({mentorId : id})
      if(mentorDetails){
       res.send(mentorDetails)
      }
    
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Data' });
  }
});

router.post('/mentor', async (req, res) => {

  try{

  const {mentorName, mentorId } = req.body;

const existingMentor = await Mentor.findOne({mentorId : mentorId});
if(existingMentor){
  res.status(400).json({message : "Mentor already exists"})
}else{              
          const mentorDetails = await Mentor({mentorName, mentorId});

          await mentorDetails.save();            
          
          res.status(201).json({message : "Mentor Added!", mentorDetails})
      
          }
         } catch(err){
      console.log(err)
  }
});

router.post('/student', async (req, res) => {

  try {

          const {studentName, studentDivision, studentRoll, studentPhoto} = req.body;
        
        const existingStudent = await Student.findOne({studentRoll, studentDivision});
        
        if(existingStudent){
          res.status(400).json({message : "Student already exists"})
        }else{ 
              
          const studentDetails = new Student({studentName, studentDivision, studentRoll, studentPhoto});

          await studentDetails.save();            
          
          res.status(201).json({message : "Student Added!", studentDetails})
      
        }
        } catch(err){
      console.log(err)
  }
});

router.post('/assign-mentor', async (req, res) => {
  const {mentorName, mentorId, studentName, studentDivision, studentRoll} = req.body;
  try {
    const mentorExists = await Mentor.findOne({mentorName : mentorName}&&{mentorId:mentorId});
    const studentExists = await Student.findOne({studentName : studentName}&&{studentDivision:studentDivision}&&{studentRoll:studentRoll});
    if(mentorExists !== null && studentExists !== null){
      const updatedDetails = await Student.updateOne(({studentRoll : `${studentRoll}`} && {studentDivision : `${studentDivision}`} ), {$set: {mentorName : mentorName, mentorId : mentorId}}, {new : true});          
          
     if(updatedDetails){res.status(201).json({message : "Mentor Assigned!", updatedDetails})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

router.put('/update-mentor', async (req, res) => {
  const {mentorName, mentorId, studentDivision, studentRoll} = req.body;
  try {
    const mentorExists = await Mentor.findOne({mentorId:mentorId});
    const studentExists = await Student.findOne({studentDivision:studentDivision}&&{studentRoll:studentRoll});
    if(mentorExists !== null && studentExists !== null){
      const updatedDetails = await Student.updateOne(({studentRoll : `${studentRoll}`} && {studentDivision : `${studentDivision}`} ), {$set: {mentorName : mentorName, mentorId : mentorId}}, {new : true});          
          
     if(updatedDetails){res.status(201).json({message : "Mentor Updated!", updatedDetails})}
  }else{
      console.log("Kindly Check the details again!")
    }
  } catch (error) {
    console.log(error)
  }
});

export default router;