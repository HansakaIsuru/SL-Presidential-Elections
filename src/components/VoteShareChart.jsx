import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const partyColors = {
  SLPP: '#87171A',
  NDF: '#2C5A45',
  DUNF: '#008000',
  UNP: '#07AF14',
  SJB: '#0B9444',
  SLMC:'#007B48',
  JVP: '#ED1847',
  NPP: '#C4094A',
  SLFP: '#0D3B90',
  PA:'#0000FF',
  UPFA:'#1609F7',
  SLMP: '#92278f',
  TNA: '#FBBF24',
  ACTC: "#FFFF00",
  SB: '#072E6E',
  LSSP:'#FF0000',
  NSSP:'#DC143C',
  IND: '#808080',
};

const VoteShareChart = ({ data, district }) => {
  const [chartType, setChartType] = useState('bar');

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">No data for {district}</p>
      </div>
    );
  }

  const { candidates, total_votes, registered_voters, total_polled, } = data;
  const names = candidates.map((c) => c.name);
  const year = data.year || new Date().getFullYear();
  const votes = candidates.map((c) => c.votes);
  const parties = candidates.map((c) => c.party);
  const colors = parties.map((party) => partyColors[party] || '#999');

  const turnout = registered_voters
    ? ((total_polled / registered_voters) * 100).toFixed(2)
    : null;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-textPrimary">
          Vote Share in {district} in {year}
        </h3>
        <button
          onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
          className="bg-accent text-white px-3 py-1 rounded hover:bg-purple-500 transition"
        >
          Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
        </button>
      </div>

      <div className="flex-1">
        <Plot
          data={[
            chartType === 'bar'
              ? {
                  type: 'bar',
                  x: names,
                  y: votes,
                  marker: { color: colors },
                  text: parties,
                }
              : {
                  type: 'pie',
                  labels: names,
                  values: votes,
                  marker: { colors },
                  textinfo: 'label+percent',
                  hoverinfo: 'label+value+percent',
                },
          ]}
          layout={{
            title: '',
            autosize: true,
            margin: { t: 30, l: 30, r: 30, b: 30 },
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
        />
      </div>

      {turnout && (
        <p className="mt-4 text-sm text-gray-600 italic text-center">
          Voter Turnout: {turnout}% ({total_polled.toLocaleString()} out of{' '}
          {registered_voters.toLocaleString()})
        </p>
      )}
    </div>
  );
};

export default VoteShareChart;
