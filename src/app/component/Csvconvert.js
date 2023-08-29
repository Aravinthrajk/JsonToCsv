import React from 'react'
import jsonexport from 'jsonexport';
import { useEffect, useState } from 'react';

const CsvConvert = ({ flattenedJson }) => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    // Fetch JSON data or use your data source
    // Here, I'm assuming jsonData is passed as a prop

    // Convert JSON to CSV on the frontend
    jsonexport(flattenedJson, (err, csv) => {
      if (err) return console.error(err);
      setCsvData(csv);
    });
  }, [flattenedJson]);

  return (
    <div>
      <h2>CSV Conversion</h2>
      {csvData && (
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download="output.csv"
        >
          Download CSV
        </a>
      )}
    </div>
  );
};

export default CsvConvert;
