import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import * as d3 from 'd3';

const HeatmapChart = ({ gene }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!gene) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Prepare data for heatmap
    const data = [
      {
        condition: 'Experimental',
        rep1: gene.expressionValues.exper_rep1,
        rep2: gene.expressionValues.exper_rep2,
        rep3: gene.expressionValues.exper_rep3
      },
      {
        condition: 'Control',
        rep1: gene.expressionValues.control_rep1,
        rep2: gene.expressionValues.control_rep2,
        rep3: gene.expressionValues.control_rep3
      }
    ];

    // Collect all expression values
    const allValues = Object.values(gene.expressionValues);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Dimensions
    const margin = { top: 50, right: 30, bottom: 70, left: 100 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create SVG with responsive viewBox
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%')
      .style('height', 'auto')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const x = d3.scaleBand()
      .range([0, width])
      .domain(['rep1', 'rep2', 'rep3'])
      .padding(0.05);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(['Experimental', 'Control'])
      .padding(0.05);

    // Color scale (red = high, blue = low)
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateRdBu)
      .domain([maxValue, minValue]);

    // A helper function to determine text color based on background
    const getTextColor = (value) => {
      const bgColor = d3.color(colorScale(value));
      if (!bgColor) return 'black'; // fallback
      const hslColor = d3.hsl(bgColor);
      // If luminance is less than ~0.5, use white text
      return hslColor.l < 0.5 ? 'white' : 'black';
    };

    // Draw axes
    svg.append('g')
      .style('font-size', '12px')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `Replicate ${d.slice(-1)}`))
      .select('.domain')
      .remove();

    svg.append('g')
      .style('font-size', '12px')
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove();

    // Create heatmap cells
    data.forEach(row => {
      ['rep1', 'rep2', 'rep3'].forEach(rep => {
        const value = row[rep];

        // Draw rectangle
        svg.append('rect')
          .attr('x', x(rep))
          .attr('y', y(row.condition))
          .attr('width', x.bandwidth())
          .attr('height', y.bandwidth())
          .style('fill', colorScale(value))
          .style('stroke', 'white')
          .style('stroke-width', 1);

        // Add text
        svg.append('text')
          .attr('x', x(rep) + x.bandwidth() / 2)
          .attr('y', y(row.condition) + y.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .style('font-size', '11px')
          .style('fill', getTextColor(value))
          .text(value.toFixed(1));
      });
    });

    // Title and subtitle
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Expression Values Heatmap');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Red = High Expression, Blue = Low Expression');

    // Color scale legend
    const legendWidth = width;
    const legendHeight = 10;

    const legendScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickFormat(d3.format('.1f'));

    const legend = svg.append('g')
      .attr('transform', `translate(0,${height + 40})`);

    // Gradient
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%');

    const numStops = 10;
    for (let i = 0; i <= numStops; i++) {
      const offset = i / numStops;
      gradient.append('stop')
        .attr('offset', `${offset * 100}%`)
        .attr('stop-color', colorScale(legendScale.invert(offset * legendWidth)));
    }

    // Draw legend rectangle
    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)');

    // Legend axis
    legend.append('g')
      .attr('transform', `translate(0,${legendHeight})`)
      .call(legendAxis);

    // Legend labels
    legend.append('text')
      .attr('x', 0)
      .attr('y', -5)
      .style('font-size', '10px')
      .style('fill', '#666')
      .text('Low Expression');

    legend.append('text')
      .attr('x', legendWidth)
      .attr('y', -5)
      .attr('text-anchor', 'end')
      .style('font-size', '10px')
      .style('fill', '#666')
      .text('High Expression');
  }, [gene]);

  return (
    <Card>
      <Card.Header>Expression Heatmap</Card.Header>
      <Card.Body>
        <div className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
          This heatmap shows gene expression levels using color intensity.
          Red colors indicate higher expression levels, while blue colors indicate lower expression levels.
          The actual expression values are shown in each cell.
        </div>
        <div className="d-flex justify-content-center">
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <svg ref={svgRef} style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HeatmapChart;
