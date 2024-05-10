'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

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
      const newFilters = { ...currentFilters, [column]: value };
      const newFilteredData = data.filter(row =>
        Object.entries(newFilters).every(([key, filterValue]) => {
          if (!filterValue) return true;
          const rowValue = row[key]?.toString().toLowerCase();
          return rowValue?.includes(filterValue);
        })
      );
      setFilteredData(newFilteredData);
      return newFilters;
    });
  };

  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  const handleDownload = async () => {
    try {
      const response = await axios.post('/api/download', { selectedIds }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  // Function to select all IDs
  const selectAll = () => {
    const allIds = filteredData.map(row => row.id); // Assuming each row has an 'id' property
    setSelectedIds(allIds);
  };

  return (
    <div className='result-container right-container'>
      <div className="result-info">
        <p id='result-reminder'>
          <span>{filteredData.length}</span> result(s) found.
        </p>
        <div className="button-container">
          <button onClick={selectAll}>Select All</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
      <div id='table-container'>
        <table id='main-table'>
          <thead>
            <tr>
              <th>SELECT</th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)} // Assuming each row has an 'id' field
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={`${rowIndex}-${valueIndex}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
