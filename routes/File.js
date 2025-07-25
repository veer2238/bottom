import File from "../models/FIle.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import express from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const htmlPath = path.join(__dirname, '..', 'public', 'emailTemplate.html');
let html = fs.readFileSync(htmlPath, 'utf8');

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
  
  
      
  const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Registration Received – V-Ex Tech Solution`,
        html: html.replace(/{{name}}/g, name)
           .replace(/{{techopted}}/g, techopted)
           .replace(/{{duration}}/g, duration)
           .replace(/{{fees}}/g, fees)
           .replace(/{{paidfees}}/g, paidfees)
           .replace(/{{pendingfees}}/g, pendingfees)
           .replace(/{{formattedDate}}/g, formattedDate)
  
      
      };
  
      
  
    
  
    
   
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
  
  
     
  
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

  app.post('/student-delete', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
      const deletedFile = await File.findByIdAndDelete(id);
      if (!deletedFile) {
        return res.json({ success: false, message: "not found" });
      }
      res.json({ success: true, message: "Thanks File deleted successfully" });
    } catch (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Error deleting file");
    }
  });

    app.post('/student-approve', async (req, res) => {
    const { id } = req.body;


    try {
      const updatedFile = await File.findByIdAndUpdate(id, { approved: true }, { new: true });
      if (!updatedFile) {
        return res.json({ success: false, message: "not found" });
      }
      res.json({ success: true, message: "Thanks File approved successfully" });
    } catch (err) {
      console.error("Error approving file:", err);
      res.status(500).send("Error approving file");
    }
   
  });
  
  export default app
