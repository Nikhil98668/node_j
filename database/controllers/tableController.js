const TableField = require('../models/TableField');

exports.createTable = async (req, res) => {
  const { tableName, fields } = req.body;
  const result = await TableField.createTable(tableName, fields);
  res.json(result);
};
