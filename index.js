const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv')

const app = express();

dotenv.config("./.env");
// Set Etsy API key
const apiKey = process.env.APIKEY;

// Define route to fetch data from Etsy API
app.get('/etsy-listings', async (req, res) => {
    try {
        // Set up headers with API key
        const headers = {
            'x-api-key': apiKey,
        };
        const keyword = "T shirt"

        // Make GET request to Etsy API
        const response = await axios.get(`https://openapi.etsy.com/v3/application/listings/active?limit=100&sort_on=score&keywords=${keyword}&sort_order=desc`, { headers });

        // Send the response data back to the client
        res.json(response.data);
    } catch (error) {
        // If there's an error, send an error response
        console.error('Error fetching data from Etsy API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Etsy API' });
    }
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
