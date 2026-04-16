import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const partyColors = {
  SLPP: '#87171A',
  NDF: '#2C5A45',
  DUNF: '#008000',
  UNP: '#07AF14',
  SJB: '#0B9444',
  SLMC: '#007B48',
  JVP: '#ED1847',
  NPP: '#C4094A',
  SLFP: '#0D3B90',
  PA: '#0000FF',
  UPFA: '#1609F7',
  SLMP: '#92278f',
  TNA: '#FBBF24',
  ACTC: '#FFFF00',
  SB: '#072E6E',
  LSSP: '#FF0000',
  NSSP: '#DC143C',
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

  const {
    candidates,
    total_votes,
    registered_voters,
    total_polled,
    rejected_votes,
  } = data;

  const names = candidates.map((c) => c.name);
  const year = data.year || new Date().getFullYear();
  const votes = candidates.map((c) => c.votes);
  const parties = candidates.map((c) => c.party);
  const colors = parties.map((party) => partyColors[party] || '#999');

  const turnout = registered_voters
    ? ((total_polled / registered_voters) * 100).toFixed(2)
    : null;

  const chartOptions = ['bar', 'pie', 'table'];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-textPrimary">
          Vote Share in {district} in {year}
        </h3>
        <div className="space-x-2">
          {chartOptions.map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 rounded transition text-sm ${chartType === type
                  ? 'bg-purple-600 text-black'
                  : 'bg-gray-200 text-blue-800 hover:bg-purple-400 hover:text-black'
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {chartType === 'table' ? (
          <div className="overflow-auto h-auto border rounded">
            <table className="table-auto w-full text-sm text-left border border-gray-300">
              <thead className="top-0 z-10 bg-white text-center border-b">
                <tr>
                  <th className="px-2 py-1 border">Candidate</th>
                  <th className="px-2 py-1 border">Party</th>
                  <th className="px-2 py-1 border">Votes</th>
                  <th className="px-2 py-1 border">%</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-2 py-1 border">{c.name}</td>
                    <td className="text-center px-2 py-1 border">{c.party}</td>
                    <td className="text-right px-2 py-1 border">
                      {c.votes.toLocaleString()}
                    </td>
                    <td className="text-center px-2 py-1 border">
                      {((c.votes / total_votes) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}

                {/* Summary Rows */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-2 py-1 border" colSpan={3}>
                    Total Valid Votes
                  </td>
                  <td className="text-right px-2 py-1 border">
                    {total_votes.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-2 py-1 border" colSpan={3}>
                    Rejected Votes
                  </td>
                  <td className="text-right px-2 py-1 border">
                    {rejected_votes.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-2 py-1 border" colSpan={3}>
                    Total Polled
                  </td>
                  <td className="text-right px-2 py-1 border">
                    {total_polled.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-2 py-1 border" colSpan={3}>
                    Registered Voters
                  </td>
                  <td className="text-right px-2 py-1 border">
                    {registered_voters.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-2 py-1 border" colSpan={3}>
                    Voter Turnout
                  </td>
                  <td className="text-right px-2 py-1 border">{turnout}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
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
                  textposition: 'outside',
                  hoverinfo: 'label+value+percent',
                  automargin: true,
                  showlegend: false,
                },
            ]}
            layout={{
              title: '',
              autosize: true,
              margin:
                chartType === 'bar'
                  ? { t: 30, l: 40, r: 30, b: 100 }
                  : { t: 30, l: 30, r: 30, b: 30 },
              ...(chartType === 'bar' && {
                xaxis: {
                 
                  tickfont: { size: 11 },
                  automargin: true,
                },
                yaxis: {
                  automargin: true,
                },
                showlegend: false,
              }),
            }}
            useResizeHandler
            style={{ width: '100%', height: '300px' }}
            config={{ responsive: true }}
          />
        )}
      </div>

      {chartType !== 'table' && turnout && (
        <p className="mt-4 text-sm text-gray-600 italic text-center">
          Voter Turnout: {turnout}% ({total_polled.toLocaleString()} out of{' '}
          {registered_voters.toLocaleString()})
        </p>
      )}
    </div>
  );
};

export default VoteShareChart;
