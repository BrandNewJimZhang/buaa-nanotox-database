import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to handle file uploads
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    
    // Parse the uploaded file using formidable
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to parse form data' });
        return;
      }

      // Access the uploaded file
      const file = files.file; // Assuming the input field is named 'file'
      const filePath = file.filepath; // Path to the uploaded file

      // Step 1: Call the Python script to process the Excel file
      exec(`python process_data.py ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${stderr}`);
          res.status(500).json({ error: 'Failed to process the data' });
          return;
        }

        // Step 2: Parse the cleaned data returned from the Python script
        const cleanedData = JSON.parse(stdout);
        const { X, y } = prepareData(cleanedData);

        // Step 3: Train the TensorFlow.js model with the cleaned data
        const results = trainModel(X, y);

        // Return the results as JSON
        res.status(200).json(results);
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function prepareData(cleanedData) {
  // Prepare the data for TensorFlow.js (split into X and y)
  const X = [
    cleanedData['diameter mean'],
    cleanedData['Chemical Purity Mean(%)'],
    cleanedData['surface(m2/g)'],
    cleanedData['zp mean'],
  ].map((col, i) => col.map((val, idx) => [val]));

  const y = cleanedData['Toxcity Conc Mean'];
  return { X, y };
}

async function trainModel(X, y) {
  // TensorFlow.js training process (simple neural network)
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [X[0].length], units: 10, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'linear' }));

  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  const X_train_tensor = tf.tensor2d(X);
  const y_train_tensor = tf.tensor2d(y);

  // 参数选择调整
  await model.fit(X_train_tensor, y_train_tensor, {
    epochs: 100,
    batchSize: 10,
  });

  // Predictions
  const y_pred_tensor = model.predict(X_train_tensor);
  const y_pred = await y_pred_tensor.array();

  // Return evaluation metrics like RMSE
  return {
    rmse: computeRMSE(y_pred, y),
  };
}

function computeRMSE(pred, actual) {
  const predTensor = tf.tensor2d(pred);
  const actualTensor = tf.tensor2d(actual);
  return Math.sqrt(tf.mean(tf.square(tf.sub(predTensor, actualTensor))).dataSync()[0]);
}
