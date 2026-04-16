import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { partyColors } from '../utils/partyColors';

const SriLankaMap = ({
  topojsonData,
  selectedYear,
  selectedDistrict,
  setSelectedDistrict,
  getResultsByYearAndDistrict,
}) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!topojsonData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawings

    const width = 600;
    const height = 700;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3
      .geoMercator()
      .center([80.7, 7.9])
      .scale(9000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const districts = feature(topojsonData, topojsonData.objects.collection).features;

    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Draw district paths
    svg
      .selectAll('path')
      .data(districts)
      .join('path')
      .attr('d', path)
      .attr('stroke', '#222')
      .attr('stroke-width', d =>
        d.properties.districts === selectedDistrict ? 2.5 : 0.7
      )
      .attr('fill', d => {
        const name = d.properties.districts;
        const data = getResultsByYearAndDistrict(selectedYear, name);
        const party = data?.candidates?.[0]?.party;
        return partyColors[party] || '#ccc';
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('stroke-width', 3)
          .attr('stroke', '#000');

        tooltip
          .html(`<strong>${d.properties.districts}</strong>`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 20}px`)
          .transition()
          .duration(150)
          .style('opacity', 0.95);

        // Show label on hover
        labels
          .filter(labelD => labelD.properties.districts === d.properties.districts)
          .transition()
          .duration(150)
          .style('opacity', 1);
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('stroke-width', d.properties.districts === selectedDistrict ? 2.5 : 0.7)
          .attr('stroke', '#222');

        tooltip.transition().duration(150).style('opacity', 0);

        // Hide label if not selected
        if (d.properties.districts !== selectedDistrict) {
          labels
            .filter(labelD => labelD.properties.districts === d.properties.districts)
            .transition()
            .duration(150)
            .style('opacity', 0);
        }
      })
      .on('click', (event, d) => {
        setSelectedDistrict(d.properties.districts);
      });

    // Draw labels
    const labels = svg
      .selectAll('text')
      .data(districts)
      .join('text')
      .attr('x', d => path.centroid(d)[0])
      .attr('y', d => path.centroid(d)[1])
      .text(d => d.properties.districts)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('font-size', 12)
      .attr('fill', d => d.properties.districts === selectedDistrict ? '#1D4ED8' : '#333')
      .style('font-weight', d => d.properties.districts === selectedDistrict ? '700' : '500')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .style('opacity', d => d.properties.districts === selectedDistrict ? 1 : 0);

  }, [topojsonData, selectedYear, selectedDistrict, setSelectedDistrict, getResultsByYearAndDistrict]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-[600px]" />
      <div
        ref={tooltipRef}
        className="absolute bg-white text-sm text-gray-700 px-3 py-1 border rounded shadow-md z-10 pointer-events-none"
      />
    </div>
  );
};

export default SriLankaMap;
