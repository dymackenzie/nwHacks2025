const express = require('express');
const serialport = require('serialport');  // For controlling Arduino via serial
const app = express();
const port = 5001;

// Set up your serial port connection (adjust for your Arduino's port)
const arduino = new serialport.SerialPort({
  path: '/dev/cu.usbmodem101',
  baudRate: 9600,
});

const cors = require('cors');
app.use(cors());
app.use(express.json())

// Endpoint to move the servo
app.post('/send', (req, res) => {
    console.log("received request, forwarding to arduino")
    const msg = req.body.msg;
    console.log(`sending ${msg} to arduino`)
    arduino.write(`${msg}\n`, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to send to Arduino' });
      }
      res.status(200).json({ message: `Sent` });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
