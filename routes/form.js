// index.js (or your route file)

const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Import your database connection module

// Handle POST request to /form
router.post('/', async (req, res) => {
    try {
        const { patientName, patientBday, patientAge, patientSex, patientRel, patientMarStat, patientOccup, patientPNum, patientEmail, patientBType, patientHeight, patientWeight, doctorPDoc, doctorPNum, doctorPEmail, conditions, allergies, surgeries } = req.body;

        // Insert patient query
        const insertPatientQuery = `
            INSERT INTO patient (patientName, patientBday, patientAge, patientSex, patientRel, patientMarStat, patientOccup, patientPNum, patientEmail, patientBType, patientHeight, patientWeight)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute patient insertion
        const [insertPatientResult] = await db.execute(insertPatientQuery, [patientName, patientBday, patientAge, patientSex, patientRel, patientMarStat, patientOccup, patientPNum, patientEmail, patientBType, patientHeight, patientWeight]);

        // Look up or insert doctor information
        let doctorId = null;
        if (doctorPDoc && doctorPNum && doctorPEmail) {
            // Check if the doctor exists
            const [doctorResult] = await db.execute(
                'SELECT doctor_ID FROM doctor WHERE doctorPDoc = ? AND doctorPNum = ? AND doctorPEmail = ?',
                [doctorPDoc, doctorPNum, doctorPEmail]
            );
            
            if (doctorResult.length > 0) {
                doctorId = doctorResult[0].doctor_ID;
            } else {
                // Insert new doctor
                const [insertDoctorResult] = await db.execute(
                    'INSERT INTO doctor (doctorPDoc, doctorPNum, doctorPEmail) VALUES (?, ?, ?)',
                    [doctorPDoc, doctorPNum, doctorPEmail]
                );
                doctorId = insertDoctorResult.insertId;
            }
        }
        
        // Process conditions
        for (const condition of conditions) {
            const { conditionName, diagnoseDate, med } = condition;
            const insertConditionQuery = `INSERT INTO \`condition\` (patient_id, condition_name, diagnose_date, medicine) VALUES (?, ?, ?, ?)`;
            await db.execute(insertConditionQuery, [insertPatientResult.insertId, conditionName, diagnoseDate, med]);
        }

        // Process allergies
        for (const allergy of allergies) {
            const { allergenName, allergyMed } = allergy;
            const insertAllergyQuery = `INSERT INTO allergy (patient_id, allergen_name, medicine) VALUES (?, ?, ?)`;
            await db.execute(insertAllergyQuery, [insertPatientResult.insertId, allergenName, allergyMed]);
        }

        // Process surgeries
        for (const surgery of surgeries) {
            const { surgeryLoc, surgeryType, surgeryDate } = surgery;
            const insertSurgeryQuery = `INSERT INTO surgery (patient_id, surgery_location, surgery_type, surgery_date) VALUES (?, ?, ?, ?)`;
            await db.execute(insertSurgeryQuery, [insertPatientResult.insertId, surgeryLoc, surgeryType, surgeryDate]);
        }

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;
