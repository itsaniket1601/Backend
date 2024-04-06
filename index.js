const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv')

const app = express();

dotenv.config("./.env");

const apiKey = process.env.APIKEY;

app.get('/etsy-listings', async (req, res) => {
    try {

        const headers = {
            'x-api-key': apiKey,
        };
        const keyword = "T shirt"


        const response = await axios.get(`https://openapi.etsy.com/v3/application/listings/active?limit=100&sort_on=score&keywords=${keyword}&sort_order=desc`, { headers });


        res.json(response.data);
    } catch (error) {

        console.error('Error fetching data from Etsy API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Etsy API' });
    }
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
