import express from "express";
import Passport from "../models/Passport.js";
import Passportfile from "../models/Passportfile.js";

const app = express();




app.post("/passport", async (req, res) => {
    const { name,date,idType, work, } = req.body;
  
    const existingRecord = await Passport.findOne({ name, work});
  
    if (existingRecord) {
      return res
        .status(400)
        .json({ success: false, error: "Your record already exists" });
    }
  
    try {
      const result = await Passport.create({
        name,
        date,
        idType,
        work,
      });
  
      console.log(result);
  
      // Send success response
      res
        .status(200)
        .json({ success: true, message: "Thanks record added successfully" });
  
     
    } catch (error) {
      console.error("Attendance Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add attendance record" });
    }
  });

  app.post("/passport-delete", async (req, res) => {
    const { id } = req.body;
  
    try {
      const result = await Passport.findByIdAndDelete({_id:id});
  
      if (result) {
      return  res.json({ success: true, message: "Record deleted successfully" });
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Deletion error:", error);
      res.status(500).json({ success: false, message: "Failed to delete record" });
    }
  });
  

  app.post("/passportfile-delete", async (req, res) => {
    const { id } = req.body;
  
    try {
      const result = await Passportfile.findByIdAndDelete({_id:id});
  
      if (result) {
      return  res.json({ success: true, message: "Record deleted successfully" });
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Deletion error:", error);
      res.status(500).json({ success: false, message: "Failed to delete record" });
    }
  });


  app.post("/passport-important", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { important: true, normal: false,status:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as important"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  app.post("/passport-check", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { status:true,important: false, normal: false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as status"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });




  app.post("/passport-normal", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { important: false, normal: true,status:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as normal"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });


  app.post("/passport-today", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {  today: true,important: false, normal: false,status:false,rejected:false,restore:false,notimp:false, },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as today"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  app.post("/passport-rejected", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {  rejected: true,important: false, normal: false,status:false,restore:false,today:false ,notimp:false, },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as today"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  
  app.post("/passport-nimp", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { notimp:true, rejected: false,important: false, normal: false,status:false,restore:false,today:false  },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as not imp"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });
  
  
  app.post("/passport-update", async (req, res) => {
    const {id, name,date, work, } = req.body
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { name,date,work }, 
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record Updated successfully"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  app.post("/passport-file", async (req, res) => {
    const {id, name, work,date } = req.body
  
    try {

      const save = await Passportfile.create({
        name,appointmentdate:date,work
      })

      console.log(save)

     
      const result = await Passport.findByIdAndDelete({ _id: id });
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record sent successfully"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });



  app.get("/passport-info", async (req, res) => {
    try {
      const PassportData = await Passport.find();
      res.status(200).json(PassportData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/passportfile-info", async (req, res) => {
    try {
      const PassportData = await Passportfile.find();
      res.status(200).json(PassportData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  app.post("/passportfile-update", async (req, res) => {
    const {id,name,work,appointmentdate, username,password,Fileno,Filestatus} = req.body
  
    try {
     
      const result = await Passportfile.findByIdAndUpdate(
        { _id: id }, 
        { name,work,appointmentdate, username,password,Fileno,Filestatus }, 
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record Updated successfully"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  
  app.post("/passport-restore", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {restore:true,important: false, normal: false,status:false,rejected:false,today:false  },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record is deleted"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  export default app
