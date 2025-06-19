import results from '../data/presidential_results.json';

export const getAvailableYears = () => {
  const years = results.map((r) => r.year);
  return [...new Set(years)].sort((a, b) => b - a); // descending
};

export const getResultsByYearAndDistrict = (year, district) => {
  return results.find((r) => r.year === year && r.district === district);
};

export const getDistrictsByYear = (year) => {
  const entries = results.filter((r) => r.year === year);
  return [...new Set(entries.map((e) => e.district))].sort();
};
