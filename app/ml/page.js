'use client';

import React, { useState } from 'react';
import Header from '@/components/header';

import Sidebar from '@/components/sidebar';

export default function Home() {
  const [results, setResults] = useState(null);
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!file) {
      alert("Please upload an Excel file");
      return;
    }

    // Create form data to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the API
      const response = await fetch('/api/ml-workflow', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the data');
      }

      // Parse the results from the API
      const data = await response.json();
      setResults(data); // Display the results
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your file.');
    }
  };

  return (
    <>
    <Header />
    <Sidebar />
    <div className='right-container'>
    <h1>Upload Excel File for ML Processing</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit">Upload and Process</button>
      </form>

      {results && (
        <div>
          <h2>Results</h2>
          <p>RMSE: {results.rmse}</p>
        </div>
      )}
    </div>
  </>
  );
}
