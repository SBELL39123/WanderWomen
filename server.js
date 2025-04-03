// server.js

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Import CORS package to handle cross-origin requests

// Initialize the Express application
const app = express();

// Enable CORS for all routes and origins
// Enable CORS only for the frontend URL
app.use(cors({
  origin: 'http://localhost:5500' // Change this to match your frontend URL
}));
// Set up body parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Serve the travel suggestion form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'travelsuggestions.html'));
});

// Handle form submission (POST request)
app.post('/submit-suggestion', (req, res) => {
  const suggestion = req.body.suggestion;

  // If there's no suggestion provided, respond with a bad request error
  if (!suggestion) {
    return res.status(400).send('No suggestion provided');
  }

  // Define the path to store the suggestions
  const filePath = path.join(__dirname, 'suggestions.txt');
  const dataToSave = `${new Date().toISOString()} - ${suggestion}\n`;

  // Append the suggestion to the suggestions.txt file
  fs.appendFile(filePath, dataToSave, (err) => {
    if (err) {
      console.error('Error saving suggestion:', err);
      return res.status(500).send('Internal server error');
    }

    // Send a success response once the suggestion is saved
    res.send('Thank you for your suggestion!');
  });
});

// Start the server
const port = 3000; // Use port 3000 for local development
app.listen(port, () => {
  console.log(`Server running locally at http://localhost:${port}`);
});

//adding cors to server



//run backend server: view-> terminal
//node server.js



//recap:
//backend server is running via localhost:30000
//live server extenstion was: local host: 5000
//combined the two using npm install cors and made sure the port was for 3000 (backend)
//to view sumbitted results: suggestions.txt
//making it work for netlify functions 


//getting frustrated about making backend server for travelsuggestions work on netlify functions and not express






