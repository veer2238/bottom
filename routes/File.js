import File from "../models/FIle.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import express from "express";
import fs from 'fs';
import path from 'path';
import Certi from "../models/Certi.js";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const htmlPath = path.join(__dirname, '..', 'public', 'emailTemplate.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const approvalemail = path.join(__dirname, '..', 'public', 'Approvalemail.html');
let approval = fs.readFileSync(approvalemail, 'utf8');

const otheremail = path.join(__dirname, '..', 'public', 'Othermail.html');
let other = fs.readFileSync(otheremail, 'utf8');

const offeremail = path.join(__dirname, '..', 'public', 'OfferMail.html');
let offer = fs.readFileSync(offeremail, 'utf8');

const certiemail = path.join(__dirname, '..', 'public', 'Completionmail.html');
let certi = fs.readFileSync(certiemail, 'utf8');

const app = express();

app.post('/upload', async (req, res) => {
    const { name,mobile,dob,email,permanentadd,presentadd,pincode,institutename,education,currentstatus,techopted,duration,fees,pendingfees,referedby} = req.body; 
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
        to: updatedFile.email,
        cc: "veer2238rajput@gmail.com",
        subject: `Approved – V-Ex Tech Solution`,
        html: approval.replace(/{{name}}/g, updatedFile.name)
           .replace(/{{techopted}}/g, updatedFile.techopted)
           
  
      
      };
  
      
  
    
  
    
   
      
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.json({ success: true, message: "Thanks File approved successfully" });


    } catch (err) {
      console.error("Error approving file:", err);
      res.status(500).send("Error approving file");
    }
   
  });

  app.post('/other-mail', async (req, res) => {
    const { id, subject, message } = req.body;

    console.log(id, subject, message);
    try {
      const fileData = await File.findById(id);
      if (!fileData) {
        return res.json({ success: false, message: "File not found" });
      }
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
        to: fileData.email,
        cc: "veer2238rajput@gmail.com",
        subject: subject,
        html:other.replace(/{{name}}/g, fileData.name)
          .replace(/{{message}}/g, message),
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.json({ success: true, message: "Thanks Email sent successfully" });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).send("Error sending email");
    }
   
  });

app.post('/offer-mail', async (req, res) => {
  const { id,offerdate, jobtitle, startdate, enddate, workmode, manager, timing } = req.body;

  try {
    const fileData = await File.findById(id);
    if (!fileData) {
      return res.json({ success: false, message: "File not found" });
    }

 
      const result = await File.findOneAndUpdate(
      { _id: id },
      { 
        startdate, 
        enddate, 
        jobtitle,
       
      },
      { new: true } // return updated document
    );

    console.log(result);

    const StartDate = new Date(startdate); 
const startday = String(StartDate.getDate()).padStart(2, '0');
const startmonth = String(StartDate.getMonth() + 1).padStart(2, '0'); 
const startyear = StartDate.getFullYear();



     const startDateStr = `${startday}/${startmonth}/${startyear}`;


    const endDate = new Date(enddate); 
    const endday = String(endDate.getDate()).padStart(2, '0');
    const endmonth = String(endDate.getMonth() + 1).padStart(2, '0'); 
    const endyear = endDate.getFullYear();

    const endDateStr = `${endday}/${endmonth}/${endyear}`;
    

    // Load and modify existing PDF
    const existingPdfBytes = fs.readFileSync(path.join(__dirname, '..', 'offer_letter.pdf'));
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPage(0);
  

    const offerDate = new Date(offerdate); 
const day = String(offerDate.getDate()).padStart(2, '0');
const month = String(offerDate.getMonth() + 1).padStart(2, '0'); 
const year = offerDate.getFullYear();

const offerDateStr = `${day}/${month}/${year}`;


   
    const dateText = `Date: ${offerDateStr}`;



const dateFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const dateSize = 12;
const dateWidth = dateFont.widthOfTextAtSize(dateText, dateSize);

page.drawText(dateText, {
  x: page.getWidth() - dateWidth - 35,
  y: 620,
  size: dateSize,
  font: dateFont,
  color: rgb(0, 0, 0),
});



function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const capitalizedName = toTitleCase(fileData.name);

const nameText = `Dear ${capitalizedName},`;
const nameFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const nameSize = 12;


page.drawText(nameText, {
 x:50,
  y: 580,
  size: nameSize,
  font: nameFont,
  color: rgb(0, 0, 0),
});



function toJobCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Job = toJobCase(jobtitle);
const jobTitleText = `We are delighted to extend to you an internship offer for the position of ${Job} Intern at V-Ex Tech Solution. Your skills, enthusiasm, and passion have greatly impressed us, and we believe you will make a valuable contribution to our team.`
const jobTitleFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

const jobTitleSize = 12;

page.drawText(jobTitleText, {
  x: 50,
  y: 550,
  size: jobTitleSize,
  font: jobTitleFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: page.getWidth() - 100, 
});


function toManagerCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Manage = toManagerCase(manager);

const InternshipDetailsText = `The internship will commence on ${startDateStr} and conclude on ${endDateStr}. It will be conducted in ${workmode} mode, under the supervision of ${Manage}, with working hours from ${timing}.`;
const InternshipDetailsFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const InternshipDetailsSize = 12;
page.drawText(InternshipDetailsText, {
  x: 50,
  y: 490,
  size: InternshipDetailsSize,
  font: InternshipDetailsFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: page.getWidth() - 100,
});

const offerDetailsText = `Roles & Responsibilities:
During your internship, you will:

1. Perform the duties and responsibilities assigned to you in alignment with company standards.

2. Maintain the confidentiality of all company information during and after your tenure.

3. Abide by all company policies, procedures, and code of conduct.

4. Submit assigned tasks/projects within the given deadlines.`
const offerDetailsFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const offerDetailsSize = 12;
page.drawText(offerDetailsText, {
  x: 50,
  y: 430,
  size: offerDetailsSize,
  font: offerDetailsFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: page.getWidth() - 100,
});

const termsText = `Terms & Conditions:
1. This internship does not guarantee full-time employment upon completion.
2. Any breach of company policies or misconduct may lead to immediate termination without prior notice..
3. You are expected to maintain professional behavior and integrity at all times`
const termsFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const termsSize = 12;
page.drawText(termsText, {
  x: 50,
  y: 305,
  size: termsSize,
  font: termsFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: page.getWidth() - 100,
});


const closingText = `We are excited to have you join our team and look forward to your contributions. Kindly confirm your acceptance by signing and returning a copy of this letter within 2 days. If you have any questions, feel free to reach out to us.`
const closingFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const closingSize = 12;
page.drawText(closingText, {
  x: 50,
  y: 215,
  size: closingSize,
  font: closingFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: page.getWidth() - 100,
});


    // Save modified PDF to buffer
    const modifiedPdfBytes = await pdfDoc.save();

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email body
    const emailHtml = offer
      .replace(/{{name}}/g,capitalizedName )
      .replace(/{{startdate}}/g, startDateStr)
      .replace(/{{enddate}}/g, endDateStr)
      .replace(/{{jobtitle}}/g, Job)
      .replace(/{{workmode}}/g, workmode)
      .replace(/{{manager}}/g, Manage)
      .replace(/{{timing}}/g, timing)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: fileData.email,
      cc: "veer2238rajput@gmail.com",
      subject: 'Internship Offer Letter – V-Ex Tech Solution',
      html: emailHtml,
      attachments: [
        {
          filename: `Offer_Letter_${fileData.name}.pdf`,
          content: modifiedPdfBytes,
          contentType: 'application/pdf',
        }
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to:' , info.response);

    res.json({ success: true, message: "Thanks Offer letter email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Error sending email");
  }
});


app.post('/certi-mail', async (req, res) => {
  const { id,completiondate,enrollment,collegename,department,collegelocation} = req.body;



  try {
    const fileData = await File.findById(id);
    if (!fileData) {
      return res.json({ success: false, message: "File not found" });
    }


    const StartDate = new Date(fileData.startdate); 
const startday = String(StartDate.getDate()).padStart(2, '0');
const startmonth = String(StartDate.getMonth() + 1).padStart(2, '0'); 
const startyear = StartDate.getFullYear();



     const startDateStr = `${startday}/${startmonth}/${startyear}`;


    const endDate = new Date(fileData.enddate); 
    const endday = String(endDate.getDate()).padStart(2, '0');
    const endmonth = String(endDate.getMonth() + 1).padStart(2, '0'); 
    const endyear = endDate.getFullYear();

    const endDateStr = `${endday}/${endmonth}/${endyear}`;


    const toUpperCaseText = (str) => {
  return str.toUpperCase();
};


    // load and modify completion certificate

 const certi_letter_pdf = fs.readFileSync(path.join(__dirname, '..', 'COMLETION_LETTER.pdf'));
    const certi_pdf = await PDFDocument.load(certi_letter_pdf);

    const certi_page = certi_pdf.getPage(0);
  

    const completeDate = new Date(completiondate); 
const day = String(completeDate.getDate()).padStart(2, '0');
const month = String(completeDate.getMonth() + 1).padStart(2, '0'); 
const year = completeDate.getFullYear();

const completeDateStr = `${day}/${month}/${year}`;


   
    const completeText = `Date: ${completeDateStr}`;



const dateFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
const dateSize = 12;
const dateWidth = dateFont.widthOfTextAtSize(completeText, dateSize);

certi_page.drawText(completeText, {
  x: certi_page.getWidth() - dateWidth - 35,
  y: 620,
  size: dateSize,
  font: dateFont,
  color: rgb(0, 0, 0),
});







const toText = `To,`;
const toFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
const toSize = 12;


certi_page.drawText(toText, {
 x:40,
  y: 580,
  size: toSize,
  font: toFont,
  color: rgb(0, 0, 0),
});

const headText = `The Head of Department`;
const headFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
const headSize = 12;


certi_page.drawText(headText, {
 x:40,
  y: 563,
  size: headSize,
  font: headFont,
  color: rgb(0, 0, 0),
});





const collegeText = toUpperCaseText(collegename)
const collegeFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
certi_page.drawText(collegeText, {
  x: 40,
  y: 548,
  size: 12,
  font: collegeFont,
  color: rgb(0, 0, 0),
});





const departmentText = toUpperCaseText(department);
const departmentFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
certi_page.drawText(departmentText, {
  x: 40,
  y: 533,
  size: 12,
  font: departmentFont,
  color: rgb(0, 0, 0),
});


function locationCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const locationText = locationCase(collegelocation);
const locationFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);

certi_page.drawText(locationText, {
  x: 40,
  y: 518,
  size: 12,
  font: locationFont,
  color: rgb(0, 0, 0),
});

const salutationText = "Dear Sir/Madam,";
const salutationFont = await certi_pdf.embedFont(StandardFonts.TimesRomanItalic);

certi_page.drawText(salutationText, {
  x: 40,
  y: 490, 
  size: 12,
  font: salutationFont,
  color: rgb(0, 0, 0),
});

function tonameCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const cnameText = tonameCase(fileData.name);


function toJobCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const cJob = toJobCase(fileData.jobtitle);

const bodyText = `This is to certify that ${ cnameText}(Enrollment Number: ${enrollment}), a student of ${collegeText}, has successfully completed their internship with V-Ex Tech Solution in the domain of ${cJob.replace("Intern","").trim()}, carried out from ${startDateStr} to ${endDateStr}.`;
const bodyFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);

certi_page.drawText(bodyText, {
  x: 40,
  y: 460,
  size: 12,
  font: bodyFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: certi_page.getWidth() - 70,
});







const domain = cJob.replace("Intern", "").trim();



 
 
const timeText = `We found ${fileData.name} to be hardworking, eager to learn, and a valuable contributor during the internship tenure. During this period, the student actively worked in the domain of ${domain}, applying relevant tools, frameworks, and technologies to successfully complete assigned tasks and deliver quality results.`;

const timeFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
certi_page.drawText(timeText, {
  x: 40,
  y: 415,
  size: 12,
  font: timeFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: certi_page.getWidth() - 70,
});

const conductText = `The internship provided ${fileData.name} with valuable exposure to real-world projects, enhancing both their technical and professional skills. The student demonstrated strong adaptability, teamwork, and effective communication, which contributed positively to the success of assigned tasks and to the team’s overall productivity.`;
const conductFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
certi_page.drawText(conductText, {
  x: 40,
  y: 355,
  size: 12,
  font: conductFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: certi_page.getWidth() - 70,
});

const closingText = `We wish ${fileData.name} all the best for their future endeavors and believe that the experience gained during this internship will be beneficial in their academic and professional journey.`;
const closingFont = await certi_pdf.embedFont(StandardFonts.TimesRoman);
certi_page.drawText(closingText, {
  x: 40,
  y: 275,
  size: 12,
  font: closingFont,
  lineHeight: 16,
  color: rgb(0, 0, 0),
  maxWidth: certi_page.getWidth() - 70,
});






    // Save modified PDF to buffer
    const completion_letter = await certi_pdf.save();

  

    // Load and modify landscape certi
    const existingPdfBytes = fs.readFileSync(path.join(__dirname, '..', 'certi.pdf'));
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const page = pdfDoc.getPage(0);
    const { width } = page.getSize(); 
    const { height } = page.getSize();
  

    const generateCertiId = () => {
  const year = new Date().getFullYear();
 return `VEX-${year}-${id.slice(-6).toUpperCase()}`;
};

const certiId = generateCertiId();

   const certiIdText = `Certificate ID: ${certiId}`;
const certiIdFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const certiIdSize = 14;  
const certiIdWidth = certiIdFont.widthOfTextAtSize(certiIdText, certiIdSize);

page.drawText(certiIdText, {
  x: width - certiIdWidth - 40,  
  y: height - 30,                
  size: certiIdSize,
  font: certiIdFont,
  color: rgb(0, 0, 0),
});

  
 const firstSize = 19;
    const firstText = `This is to certify that `;
    const firstFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const firstWidth = firstFont.widthOfTextAtSize(firstText, firstSize);
   
    page.drawText(firstText, {
       x:(width - firstWidth) / 2,
      y: 400,
      size: firstSize,
      font: firstFont,
      color: rgb(0, 0, 0),
    
    });







function toTitleCase(str) {
  return str
    .toUpperCase()
   

    
}



const nameText = toTitleCase(fileData.name);

const nameSize = 30;


const nameFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold); 
const textWidth = nameFont.widthOfTextAtSize(nameText, nameSize);


page.drawText(nameText, {
  x:(width - textWidth) / 2,
  y: 350, 
  size: nameSize,
  lettering: -8,

  font: nameFont,
  color: rgb(0, 0, 0),
});

const decText = `has successfully completed an internship in`;
const decFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const decSize = 19;
 
page.drawText(decText, {
  x: (width - decFont.widthOfTextAtSize(decText, decSize)) / 2,
  y: 310,
  size: decSize,
  font: decFont,
  color: rgb(0, 0, 0),
  

});

function toTechCase(str) {
  return str
    .toUpperCase()
    
    
}

const techText = toTechCase(fileData.jobtitle);

const techFont = await pdfDoc.embedFont(StandardFonts.Courier);
const techSize = 26;
page.drawText(techText, {
  x: (width - techFont.widthOfTextAtSize(techText, techSize)) / 2,
  y: 275,
  size: techSize,
  font: techFont,
  color: rgb(0, 0, 0),
  letterSpacing: 10,
});



const durationText = `at V-Ex Tech Solution from ${startDateStr} to ${endDateStr}.`;
const durationFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
const durationSize = 19;
page.drawText(durationText, {
  x: (width - durationFont.widthOfTextAtSize(durationText, durationSize)) / 2,
  y: 239,
  size: durationSize,
  font: durationFont,
  color: rgb(0, 0, 0),
  letterSpacing: 0.5,
});













    // Save modified PDF to buffer
    const modifiedPdfBytes = await pdfDoc.save();


      const work = `${nameText} has successfully completed an internship in ${techText} at V-Ex Tech Solution from ${startDateStr} to ${endDateStr}.`;
  
  
  
   
      const result = await Certi.create({
        name:nameText,
        work,
        certiId
      });
  
      console.log(result);

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email body
    const emailHtml = 
    
    certi.replace(/{{nameText}}/g, cnameText)
      .replace(/{{techText}}/g, techText);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: fileData.email,
      cc: "veer2238rajput@gmail.com",
      subject: 'Internship Completion – V-Ex Tech Solution',
      html: emailHtml,
      attachments: [
        {
          filename: `Certificate_${fileData.name}.pdf`,
          content: modifiedPdfBytes,
          contentType: 'application/pdf',
        },
         {
          filename: `Completion_Letter_${fileData.name}.pdf`,
          content: completion_letter,
          contentType: 'application/pdf',
        }
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to:' , info.response);


   
  
  
      res.json({ success: true, message: 'Thanks certi details has been sent' });
    

   
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Error sending email");
  }
});




  
  export default app
