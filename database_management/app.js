// app.js

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const TableField = require('./models/tableField');
const app = express();
const TableRoutes = require('./routes/TableRoutes');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));


/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});*/

app.post('/createTable', async (req, res) => {
    const { tableName, fieldName, fieldType } = req.body;
    try {
        await TableField.createTable(tableName, fieldName, fieldType);
        res.send('Table created successfully');
    } catch (error) {
        res.status(500).send('Error creating table: ' + error.message);
    }
});
app.use('/createTable', TableRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


