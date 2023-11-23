const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('./connection/db')
const logger = require('../logs/logger.js');

const updateEmployee = async (req, res) => {
    const errors = validationResult(req);
    const employeeId = req.params.id;
    const updatedData = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Retrieve existing data
        const existingData = await db.query('SELECT * FROM employees WHERE employee_id = $1', [employeeId]);
    
        // Step 3: Perform the update based on comparisons
        const updatedEmployee = {
          ...existingData.rows[0], // Keep the existing data
          ...updatedData,  // Apply the updates
        };
    
        // Update the data in the database
        const result = await db.query('UPDATE employees SET name = $1, job_title = $2, salary = $3, department = $4, joined_date = $5, isactive = $6 WHERE employee_id = $7',
          [updatedEmployee.name, updatedEmployee.job_title, updatedEmployee.salary, updatedEmployee.department, updatedEmployee.joined_date, updatedEmployee.isactive, employeeId]);
        if (result.rowCount === 1) {
          return res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            return res.status(404).json({ message: 'Employee not found' });
        }
      } catch (error) {
        logger.error(`Error on update employee: ${error}`)
        res.status(500).json({ message: 'Internal Server Error' });
      }
    
}   
module.exports = {updateEmployee}
