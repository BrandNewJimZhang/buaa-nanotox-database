'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Fetch data from your API
    axios.get('http://localhost:3000/api/getData')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Initialize with all data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilterChange = (e, column) => {
    const value = e.target.value.toLowerCase();
    setFilters(currentFilters => {
      // Create new filters based on the current state and the new value for the given column.
      const newFilters = { ...currentFilters, [column]: value };

      // Immediately use newFilters to set the filtered data.
      const newFilteredData = data.filter(row =>
        Object.entries(newFilters).every(([key, filterValue]) => {
          // If there is no filter set for this key, include the row.
          if (!filterValue) return true;
          // Otherwise, check if the row's value matches the filter.
          const rowValue = row[key]?.toString().toLowerCase();
          return rowValue?.includes(filterValue);
        })
      );

      setFilteredData(newFilteredData);

      // Return the newFilters to update the state.
      return newFilters;
    });
  };

  // Extract column headers from the first data row
  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table id='main-table'>
      <thead>
        <tr>
          {columnHeaders.map(header => (
            <th key={header}>
              {header}
              <input
                type="text"
                value={filters[header] || ''}
                onChange={(e) => handleFilterChange(e, header)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, valueIndex) => (
              <td key={`${rowIndex}-${valueIndex}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
