const TableField = require('./models/tableField');

exports.createTable = async (req, res) => {
    try {
        const { tableName, fields } = req.body;
        await TableField.createTable(tableName, fields);
        res.status(200).json({ success: true, message: 'Table created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create table', error: error.message });
    }
};
