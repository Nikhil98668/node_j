const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Sequelize configuration
const sequelize = new Sequelize('database', 'root', 'cccc', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define Model for Table Schema
const Table = sequelize.define('Table', {
  tableName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fieldName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fieldType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPrimaryKey: { // Add column to specify if the field is a primary key
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Default value is false
  }
});

// Sync Model with Database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

// Create Table Endpoint
app.post('/createTable', async (req, res) => {
  const { tableName, fields } = req.body;

  try {
    // Ensure that tableName and fields are validated and sanitized
    await sequelize.query(`CREATE TABLE ${tableName} (${fields})`);
    console.log(fields);
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    console.log('Error creating table:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch table names
app.get('/tableNames', async (req, res) => {
  try {
    const tableNames = await Table.findAll({ attributes: ['tableName'] });
    console.log(tableNames);
    res.status(200).json(tableNames.map(table => table.tableName));
  } catch (error) {
    console.log('Error fetching table names:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Insert Values Endpoint
app.post('/insertValues', async (req, res) => {
  const { tableName, values } = req.body;

  try {
    const table = await Table.findOne({ where: { tableName } });
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    const fieldNames = Object.keys(values);
    const fieldValues = fieldNames.map(fieldName => values[fieldName]);

    // Insert values into the table
    await Table.create({
      tableName,
      fieldName: fieldNames.join(','),
      fieldType: fieldValues.map(value => typeof value).join(',')
      //isPrimaryKey: false // Assuming none of the inserted fields are primary keys
    });

    res.status(200).json({ message: 'Values inserted ' });
  } catch (error) {
    console.log('Error inserting values:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve fields of a table
/*app.get('/getFields', async (req, res) => {
  const tableName = req.query.tableName;

  try {
    const tableFields = await Table.findAll({ 
      where: { tableName },
      attributes: ['fieldName', 'fieldType']
    });
    
    const fields = tableFields.map(field => ({
      Field: field.fieldName,
      Type: field.fieldType
    }));
    
    res.status(200).json({ fields });
  } catch (error) {
    console.log('Error fetching fields:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
app.get('/getFields', async (req, res) => {
    const tableName = req.query.tableName;

    try {
        // Retrieve the table fields directly from the database
        const tableFields = await sequelize.queryInterface.describeTable(tableName);
        const fieldNames = Object.keys(tableFields);

        res.status(200).json({ fields: fieldNames });
    } catch (error) {
        console.error('Error fetching fields:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to delete values from a table
app.delete('/deleteValues/:tableName/:id', async (req, res) => {
  const { tableName, id } = req.params;

  try {
    await Table.destroy({ where: { tableName, id } });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.log('Error deleting record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
