const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const Appointment = require('./models/Appointment');

const app = express(); 
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(bodyParser.json());
 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log('MongoDB connection error:', error));

app.post('/api/bookings', async (req, res) => {
    try {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
      console.error('Error saving appointment:', error);
      res.status(500).json({ message: 'Failed to book appointment', error });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
