import ContactUser from '../models/Contact.js'
import express from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
dotenv.config();



const app = express();



app.post("/contact", async (req, res) => {
    const {name,email,phone,message} = req.body;
  try{
    const exist =await ContactUser.findOne({email,message})
    if(exist){
      return res.json({success:false,error:'you have already enquired about the same issue'})
    }
    const result = await ContactUser.create({
      name,
      email,
      phone,
      message
    });
  
    console.log(result);
  
    
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        cc: "himanshu0409agraval@gmail.com",
        subject: "Thanks for Contacting at V-Ex Tech Solution",
        html: `
          <div style="background-color: #f8f8f8; padding: 20px; font-family: 'Arial', sans-serif; color: #333;">
            <p style="font-size: 18px; color: #007BFF;">Hi ${name},</p>
            <p style="font-size: 16px;">Thank you for contacting V-Ex Tech Solution. We have received your query and will get back to you soon.</p>
      
            <div style="margin: 20px 0; padding: 10px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 16px;">We have your contact details:</p>
              <p style="font-size: 16px; margin-bottom: 5px;"><strong>Email:</strong> ${email}</p>
              <p style="font-size: 16px; margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</p>
            </div>
      
            <img src="https://v-extechsolution.in/static/media/logo.b48612c02e688a28a62f.png" alt="Thank You Image" style="max-width: 100%; height: auto; margin-bottom: 20px;">
      
            <p style="font-size: 16px;">In the meantime, feel free to call us at <strong style="color: #007BFF;">+91 9664768292</strong>. We look forward to assisting you!</p>
      
            <p style="font-size: 16px; margin-top: 20px;">Best regards,</p>
            <p style="font-size: 16px;">V-Ex Tech Solution</p>
            <p style="font-size: 16px;">301, DHUN COMPLEX, ABOVE</p>
            <div style="margin-top: 50px; color: #666;">
            <a href="https://v-extechsolution.in" style="font-size: 16px; line-height: 1.5;">v-extechsolution.in</a><br>
            <a href="mailto:veeragraval@v-extechsolution.in" style="font-size: 16px; line-height: 1.5;">veeragraval@v-extechsolution.in</a><br>
            <a href="tel:9664768292" style="font-size: 16px; line-height: 1.5;">+91 9664768292</a>
      <div style="margin-top: 50px;">
            <a href="https://www.linkedin.com/company/v-ex-tech-software-company-in-vadodara/mycompany/" style="text-decoration: none; color: #333; padding:0 14px;"><img src="https://i.ibb.co/1MpdrG8/download-1.png" alt="download-1" border="0" style="width:15%"></a>
            <a href="https://www.youtube.com/@Veer_Agraval" style="text-decoration: none; color: #333; padding:0 14px;"><img src="https://i.ibb.co/b60S7TZ/download.png" alt="download-1" border="0" style="width:15%"></a>
            <a href="https://www.instagram.com/v_extech/?igshid=Zjc2ZTc4Nzk%3D" style="text-decoration: none; color: #333; padding:0 14px;"><img src="https://i.ibb.co/xYLHv49/download.jpg" alt="download-1" border="0" style="width:15%"></a>
          </div>
          </div>
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-top: 20px;">Dhun Complex-301, Above Riya Bridal, near Amritsari Kulcha, opp. pavan park society, Nizampura, Vadodara, Gujarat 390002</p>
          </div>
        `,
      });
  
    
      
  
      console.log("Message sent:", info.messageId);
      res.json({success:true,message:' Thanks Your message has been sent'})
  
    } catch (error) {
      console.error("Contact Error:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send message" });
    }
  });

  app.get("/enquiry", async (req, res) => {
    try {
      const allEnuiryData = await ContactUser.find();
      res.status(200).json(allEnuiryData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  app.post("/enquiry-delete", async (req, res) => {
    const {id} = req.body;
    console.log(id)
  try{
    const deletedEnquiry = await ContactUser.findByIdAndDelete({_id:id});

    if (deletedEnquiry) {
      res.json({ success: true, message: 'Enquiry deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: "Enquiry not found" });
    }
  
    } catch (error) {
      console.error("Contact Error:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send message" });
    }
  });

  export default app

