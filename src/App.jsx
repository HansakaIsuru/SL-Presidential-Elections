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
import './App.css';

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
    if (compareYear === year) {
      const otherYear = years.find((y) => y !== year);
      if (otherYear) setCompareYear(otherYear);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-full ">
      <main className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-10">
          Sri Lanka Presidential Election Results
        </h1>

        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="bg-purple-600 hover:bg-purple-700 text-blue-800 px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            {compareMode ? 'Close Compare Mode' : 'Compare Another Year'}
          </button>

          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-blue-600 hover:bg-blue-700 text-blue-800 px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        <div className="bg-white w-full rounded-2xl shadow-md p-6 mb-6">
          <ElectionSelector
            years={years}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            compareMode={compareMode}
            compareYear={compareYear}
            onCompareYearChange={setCompareYear}
          />
        </div>

        {showMap && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Click on a District to View Results
            </h2>
            <SriLankaMap
              topojsonData={topojsonData}
              selectedYear={selectedYear}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              getResultsByYearAndDistrict={getResultsByYearAndDistrict}
            />
          </div>
        )}
        
        <div className={`grid gap-3 ${compareMode ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          <div className="bg-white rounded-2xl shadow-md p-6 h-auto flex flex-col justify-center">
            <VoteShareChart data={data} district={selectedDistrict} />
          </div>
          {compareMode && (
            <div className="bg-white rounded-2xl shadow-md p-6 h-auto flex flex-col justify-center">
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
