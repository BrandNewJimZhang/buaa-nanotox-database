// components/PieChart.js
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function PieChart({ directory, file }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(`/panther-data/${directory}/${file}`).then((data) => {
      const formattedData = data.map(d => ({
        category: d.category,
        value: +d['Number of genes']
      }));
      setData(formattedData);
    });
  }, [directory, file]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (data) => {
    const width = 450;
    const height = 600;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    d3.select('#pie-chart').select('svg').remove();
    d3.select('#legend').selectAll('*').remove(); // Clear the legend div

    const svg = d3
      .select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${radius}, ${height / 2})`);

      const customColors = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
        '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39'
      ];
      
      const color = d3.scaleOrdinal(customColors);

    const pie = d3.pie()
      .value(d => d.value);

    const data_ready = pie(data);

    svg
      .selectAll('slices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius))
      .attr('fill', d => color(d.data.category))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add legend
    const legend = d3.select('#legend')
      .selectAll('div')
      .data(data_ready)
      .enter()
      .append('div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin', '5px 0');

    legend.append('div')
      .style('width', '18px')
      .style('height', '18px')
      .style('background-color', d => color(d.data.category))
      .style('margin-right', '10px');

    legend.append('div')
      .text(d => d.data.category);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div id="pie-chart" style={{ flex: '0 0 450px', marginLeft: '20px' }}></div>
      <div id="legend" style={{ flex: '1', paddingLeft: '20px' }}></div>
    </div>
  );
};


