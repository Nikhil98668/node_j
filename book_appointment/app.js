// app.js
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));


/*app.get('/', (req, res) => {
    res.sendFile(__dirname +'/views'+'/index.html');
  });*/

app.use('/', userRoutes);


app.listen(3000);
