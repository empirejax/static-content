const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());

app.get('/proxy', (req, res) => {
  // This is the URL of the resource you are trying to access
  const url = req.query.url;

  // Set up the request options
  const options = {
    url: url,
    headers: {
      'User-Agent': 'request',
    },
    encoding: null, // This ensures that the body is returned as a Buffer
  };

  request({url: url, headers: {'User-Agent': 'request'}}, (error, response, body) => {
    if (error) {
      return res.status(500).json({type: 'error', message: error.message});
    }
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).json({type: 'error', message: 'Unexpected status code: ' + response.statusCode});
    }

    res.json(JSON.parse(body));
});

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
