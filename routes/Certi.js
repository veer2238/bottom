
import Certi from "../models/Certi.js";
import express from "express";

const app = express();

app.post('/certi', async (req, res) => {
    const { name, work,certiId} = req.body;
  
    const existingRecord = await Certi.findOne({ name,certiId});
  
    if (existingRecord) {
      return res
        .status(400)
        .json({ success: false, error: 'Your certi already exists' });
    }
  
    try {
      const result = await Certi.create({
        name,
        work,
        certiId
      });
  
      console.log(result);
  
      // Send success response
      res.status(200).json({
        success: true,
        message: 'certi added successfully',
      });
  
    } catch (error) {
      console.error('Certi Error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Failed to add certi record' });
    }
  });
  
  app.post('/certi-details', async(req, res) => {
    try {
      const { certiid } = req.body;
  
      const certiDetails = await Certi.findOne({ certiId:certiid });
  
      if (!certiDetails) {
        return res.status(404).json({ success: false, message: 'Certificate details not found' });
      }
  
      res.status(200).json({ success: true, data: certiDetails });
    } catch (error) {
      console.error('Error processing certification ID:', error);
      res.status(500).json({ success: false, message: 'Failed to process certification ID' });
    }
  });

export default app
