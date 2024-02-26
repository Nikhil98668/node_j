// app.js
const express = require('express');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const path = require('path');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));


app.use('/api', expenseRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
