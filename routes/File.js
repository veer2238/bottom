import File from "../models/FIle.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.post('/upload', async (req, res) => {
    const { name,mobile,dob,email,permanentadd,presentadd,pincode,institutename,education,currentstatus,techopted,duration,fees,pendingfees,referedby,photo,aadhar } = req.body; 
    try {
    const newFile = await File.create({
    
      name,
      dob,
      mobile,
      email,
      permanentadd,
      presentadd,
      pincode,
      institutename,
      education,
      currentstatus,
      techopted,
      duration,
      fees,
      pendingfees,
      referedby,
      photo,
      aadhar
    });
  
    // await newFile.save();
      console.log(newFile);
  
   
      // Load existing PDF
      // const existingPdfPath = './slip.pdf';
      // const existingPdfBytes = fs.readFileSync(existingPdfPath);
      // const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
      // Modify existing PDF
      const currentDate = new Date();
      
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const paidfees = fees-pendingfees
      // const page = pdfDoc.getPage(0);
      // page.drawText(name, { x: 105, y: 538, size: 12, color: rgb(0, 0, 0) });
      // page.drawText(formattedDate, { x: 395, y: 542, size: 12, color: rgb(0, 0, 0) });
      // page.drawText(techopted, { x: 105, y: 413, size: 16, color: rgb(0, 0, 0) });
      // page.drawText(fees.toString(), { x: 490, y: 413, size: 16, color: rgb(0, 0, 0) });
      // page.drawText(fees.toString(), { x: 490, y: 236, size: 16, color: rgb(0, 0, 0) });
      // page.drawText(duefees.toString(), { x: 490, y: 208, size: 16, color: rgb(0, 0, 0) });
      // page.drawText(pendingfees.toString(), { x: 490, y: 177, size: 16, color: rgb(0, 0, 0) });
  
  
      
  
      
    
  
  
     
  
      res.json({success:true,message:'Thanks registration details has been sent'});
   
    } catch (err) {
      console.error("Error saving file to database:", err);
      res.json({success:false,error:'Please try again'});
    }
  });
  
  
  app.get('/api/get-file-data', async (req, res) => {
    try {
      const fileData = await File.find(); // Retrieve all file data
      res.json(fileData);
    } catch (err) {
      console.error("Error fetching file data:", err);
      res.status(500).send("Error fetching file data");
    }
  });
  
  export default app
