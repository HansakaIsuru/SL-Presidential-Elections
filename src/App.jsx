import React, { useState } from 'react';
import ElectionSelector from './components/ElectionSelector';
import VoteShareChart from './components/VoteShareChart';
import Footer from './components/Footer';
import SriLankaMap from './components/SriLankaMap';
import {
  getAvailableYears,
  getDistrictsByYear,
  getResultsByYearAndDistrict,
} from './utils/dataUtils';
import topojsonData from './data/sri-lanka-districts.json';

const App = () => {
  const years = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(getDistrictsByYear(selectedYear)[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [compareYear, setCompareYear] = useState(years[1] || years[0]);
  const [showMap, setShowMap] = useState(true);

  const districts = getDistrictsByYear(selectedYear);
  const data = getResultsByYearAndDistrict(selectedYear, selectedDistrict);
  const compareData = getResultsByYearAndDistrict(compareYear, selectedDistrict);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const newDistricts = getDistrictsByYear(year);
    setSelectedDistrict(newDistricts[0]);
    // Optional: Reset compare year if same as selected year
    if (compareYear === year) {
      const otherYear = years.find((y) => y !== year);
      if (otherYear) setCompareYear(otherYear);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Sri Lanka Presidential Election Results
        </h1>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            {compareMode ? 'Close Compare Mode' : 'Compare Another Year'}
          </button>

          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ElectionSelector
            years={years}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
          />
        </div>

        {/* 🆕 Compare Year Selector */}
        {compareMode && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-md mx-auto">
            <label htmlFor="compare-year" className="text-sm font-medium text-gray-700 mb-1 block">
              Select Compare Year
            </label>
            <select
              id="compare-year"
              value={compareYear}
              onChange={(e) => setCompareYear(parseInt(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              {years
                .filter((y) => y !== selectedYear)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Map Section */}
        {showMap && (
          <div className="mb-8">
            <SriLankaMap
              topojsonData={topojsonData}
              selectedYear={selectedYear}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              getResultsByYearAndDistrict={getResultsByYearAndDistrict}
            />
          </div>
        )}

        {/* Charts */}
        <div className={`grid gap-10 ${compareMode ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          <div className="bg-white rounded-2xl shadow-md p-4 h-[500px] flex flex-col justify-center">
            <VoteShareChart data={data} district={selectedDistrict} />
          </div>
          {compareMode && (
            <div className="bg-white rounded-2xl shadow-md p-4 h-[500px] flex flex-col justify-center">
              <VoteShareChart data={compareData} district={selectedDistrict} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
