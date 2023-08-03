import { useEffect, useRef, useState } from "react";
import * as d3 from "d3"
import { scaleOrdinal } from "d3-scale";




const PieChart = () => {
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
            const width = 300;
            const height = 200;
            const radius = Math.min(width, height) / 2;

            // Create color scale
            const colorScale = scaleOrdinal()
                .domain(["A", "B", "C"])
                .range(["green", "yellow", "blue"]);


            // Create pie generator
            const pie = d3.pie()
                .value((d) => d?.value)
                .sort(null);

            // Create arc generator
            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            // Append chart to SVG
            const chart = svg.append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            // Create pie slices
            const slices = chart.selectAll('.slice')
                .data(pie(data))
                .enter()
                .append('g')
                .attr('class', 'slice');

            // Append arcs to slices
            slices.append('path')
                .attr('d', arc)
                .attr("fill", (d) => colorScale(d.data.label));

            // Append text labels to slices
            slices.append('text')
                .attr('transform', (d) => `translate(${arc.centroid(d)})`)
                .attr('dy', '0.35em')
                .text((d) => d.data.label);
        }
    }, [data]);


    return (
        <>
            <svg ref={svgRef} className="w-80 h-96"/>
        </>
    );
};

export default PieChart;