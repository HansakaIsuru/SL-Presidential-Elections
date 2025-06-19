import React, { useState } from 'react';

const ElectionSelector = ({
  years,
  selectedYear,
  onYearChange,
  districts,
  selectedDistrict,
  onDistrictChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter((d) =>
    d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Year Selector */}
      <div className="flex flex-col w-full">
        <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">
          Select Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* District Selector */}
      <div className="flex flex-col w-full">
        <label htmlFor="district-search" className="text-sm font-medium text-gray-700 mb-1">
          Search District
        </label>
        <input
          type="text"
          id="district-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter district name..."
          className="mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))
          ) : (
            <option disabled>No districts found</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default ElectionSelector;
