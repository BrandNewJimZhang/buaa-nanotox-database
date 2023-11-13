import Image from 'next/image';
import Header from '@/components/header';
import { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch('http://localhost:3000/api/getData');
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData(); // Replace with your data fetching logic
        setData(fetchedData);
        setFilteredData(fetchedData); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleFilterChange = (e, column) => {
    const newFilters = { ...filters, [column]: e.target.value.toLowerCase() };
    setFilters(newFilters);

    const newFilteredData = data.filter(row =>
      Object.entries(row).some(([key, value]) =>
        newFilters[key] === undefined || value.toString().toLowerCase().includes(newFilters[key])
      )
    );

    setFilteredData(newFilteredData);
  };

  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      <Header />
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
                    onChange={(e) => handleFilterChange(e, header)}
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
  )
}