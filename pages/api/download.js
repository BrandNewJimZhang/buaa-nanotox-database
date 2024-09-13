// pages/api/download.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        });

        // Extract the selected IDs from the request body
        const { selectedIds } = req.body;

        // Check if selectedIds is valid
        if (!selectedIds || !Array.isArray(selectedIds) || selectedIds.length === 0) {
            res.status(400).send('No IDs provided for download');
            return;
        }

        // Prepare and execute the SQL query
        const query = `SELECT * FROM original_dataset WHERE id IN (${selectedIds.map(() => '?').join(',')})`;
        const [rows] = await connection.execute(query, selectedIds);

        // Convert the result set to CSV format
        const csvData = convertToCSV(rows);

        // Set the headers to indicate a file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="download.csv"');

        // Send the CSV data
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Error processing the download:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to convert data to CSV format
function convertToCSV(data) {
    if (data.length === 0) {
        return '';
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}