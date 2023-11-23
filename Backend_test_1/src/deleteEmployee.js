const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');
const jwt = require('jsonwebtoken');

const deleteEmployee = async (req, res) => {
    const errors = validationResult(req);
    const employeeId = req.params.id;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Insert the data in the database
        const result = await db.query('DELETE FROM employees WHERE employee_id = $1',
          [employeeId]);
        if (result.rowCount === 1) {
          return res.status(200).json({ message: 'Employee Delete successfully' });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
      } catch (error) {
        logger.error(`Error on Delete employee: ${error}`)
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    
}   
module.exports = {deleteEmployee}
