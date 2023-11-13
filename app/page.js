'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = () => {
      axios.get('http://localhost:3000/api/getData')
        .then(response => {
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
  }, []);

  const handleFilterChange = (e, column) => {
    console.log('Filtering:', column, e.target.value); // This should log whenever you type in an input

    const newFilters = { ...filters, [column]: e.target.value.toLowerCase() };
    setFilters(newFilters);

    const newFilteredData = data.filter(row =>
      Object.entries(row).some(([key, value]) =>
        newFilters[key] === undefined || value.toString().toLowerCase().includes(newFilters[key])
      )
    );

    setFilteredData(newFilteredData);
    
    console.log('Filtered Data:', newFilteredData);
  };

  const simpleInputChange = (e) => {
    console.log('Input changed:', e.target.value);
  };

  // Extract column headers from the first data row
  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      <div>
        <h1>Data from MySQL:</h1>
        <table>
          <thead>
            <tr>
              {columnHeaders.map(header => (
                <th key={header}>
                  {header}
                  <input
                    type="text"
                    value={filters[header] || ''}
                    onChange={(e) => {
                      console.log(`Current value for ${header}:`, e.target.value); // This should also log whenever you type
                      handleFilterChange(e, header);
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
