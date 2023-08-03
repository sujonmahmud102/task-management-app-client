import * as d3 from "d3"
import { useEffect, useRef, useState } from "react";

const BarChart = () => {
  const [data, setTasks] = useState(null);
  

  useEffect(() => {
    fetch('https://task-management-system-server-dun.vercel.app/tasks')
      .then(res => res.json())
      .then(data => {
        const completed = data.filter((t) => t.status == 'Completed');
        const inCompleted = data.filter((t) => t.status == 'Incomplete');
        const inProgress = data.filter((t) => t.status == 'In Progess');
        const arr = [
          { label: 'A', value: completed.length },
          { label: 'B', value: inCompleted.length },
          { label: 'C', value: inProgress.length },
        ];
        setTasks(arr);
      })
  }, [])




  const svgRef = useRef();

  useEffect(() => {
    if (data && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Define chart dimensions
      const width = 200;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Create x and y scales
      const xScale = d3.scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, chartWidth])
        .padding(0.5);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([chartHeight, 0]);

      // Create x and y axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Append chart to SVG
      const chart = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Append x and y axes
      chart.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(xAxis);

      chart.append('g')
        .call(yAxis);

      // Create bars
      chart.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.label))
        .attr('y', (d) => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => chartHeight - yScale(d.value));
    }
  }, [data]);

  return (
    <>
      <svg ref={svgRef} className="w-80 h-48" />
    </>
  );
};

export default BarChart;