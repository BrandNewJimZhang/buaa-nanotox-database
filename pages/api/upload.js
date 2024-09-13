import multer from 'multer';
import { exec } from 'child_process';

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        // You could rename the file here if required
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false, // Disabling bodyParser allows multer to handle multipart/form-data
    },
};

export default async (req, res) => {
    // Initialize multer middleware within the Next.js API route
    await new Promise((resolve, reject) => {
        upload.single('file')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return reject(err);
            } else if (err) {
                return reject(err);
            }
            resolve();
        });
    });

    if (req.method === 'POST') {
        // File is available in req.file
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        
        // Execute the Python script using the uploaded file
        const filePath = './public/uploads/' + req.file.filename; // Make sure this path matches the file location
        const pythonScriptPath = './public/python/process.py'; // Update with the actual path to your Python script

        exec(`python ${pythonScriptPath} "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({ error: 'Error executing Python script' });
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).json({ error: 'Python script error' });
            }
            // Assuming the Python script outputs the path or you know the path already
            const imageUrl = '/output/plot.png'; // The URL where the image is accessible
            res.status(200).json({ message: 'File uploaded and processed successfully', data: stdout, imageUrl: imageUrl });
        });
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
