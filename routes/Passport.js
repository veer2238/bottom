import express from "express";
import Passport from "../models/Passport.js";

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


 




  app.get("/passport-info", async (req, res) => {
    try {
  

  


    
 
    
  
      const PassportData = await Passport.find();
      res.status(200).json(PassportData);
    } catch (error) {
      console.error("Error fetching passport data:", error);
      res.status(500).json({ error: "Internal Server Error" });
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
  

 


  app.post("/passport-check", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { status:true,rejected:false,notimp:false,restore:false,today:false,book:false },
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

  app.post("/passport-checkb", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { status:false,rejected:false,notimp:false,restore:false,today:false,book:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as new entry"});
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
        {today:true,  notimp:false,rejected:false,restore:false,status:false,book:false },
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

  app.post("/passport-todayb", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {today:false,  notimp:false,rejected:false,restore:false,status:false,book:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as mew record"});
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
        {rejected:true,restore:false,status:false,today:false,notimp:false,book:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as rejected"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  app.post("/passport-rejectedb", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {rejected:false,restore:false,status:false,today:false,notimp:false,book:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as new entry"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });


  app.post("/passport-book", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {rejected:false,restore:false,status:false,today:false,notimp:false,book:true},
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as book"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  app.post("/passport-bookb", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {rejected:false,restore:false,status:false,today:false,notimp:false,book:false},
        { new: true }
      );
    }catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  
  app.post("/passport-nimp", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {notimp:true,rejected:false,restore:false,status:false,today:false,book:false },
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

  app.post("/passport-nimpb", async (req, res) => {
    const { id } = req.body;
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        {notimp:false,rejected:false,restore:false,status:false,today:false,book:false },
        { new: true }
      );
  
      if (result) {
        console.log(result)
        return res.json({ success: true, message: "Record marked as new entry"});
      } else {
        return res.json({ success: false, message: "Record not found" });
      }
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Failed to update record" });
    }
  });

  
  
  
  app.post("/passport-update", async (req, res) => {
    const {id, name,date, work,idType } = req.body
  
    try {
     
      const result = await Passport.findByIdAndUpdate(
        { _id: id }, 
        { name,date,work,idType }, 
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
        {rejected:false,restore:true,status:false,today:false,notimp:false,book:false },
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
