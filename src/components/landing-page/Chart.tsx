import React from 'react';
import { DropdownMenuCheckboxes } from "../DropdownCheckbox";
import { ChartSelector } from '../Chart/ChartSelector';
import { normalizeChartData } from "../../lib/chartHelpers";

interface ChartProps {
  sortedEndpoints: string[];
  selectedApis: string[];
  setSelectedApis: React.Dispatch<React.SetStateAction<string[]>>;
  countData: any[];
  countAvgPTime: any[];
}

const Chart: React.FC<ChartProps> = ({ sortedEndpoints, selectedApis, setSelectedApis, countData, countAvgPTime }) => {
  return (
    <>
      {sortedEndpoints.length > 0 && (
        <DropdownMenuCheckboxes
          apiEndpoints={sortedEndpoints}
          selectedApis={selectedApis}
          setSelectedApis={setSelectedApis}
        />
      )}

      {countData.length > 0 && (
        <ChartSelector data={normalizeChartData(countData)} title="Count" />
      )}

      {countAvgPTime.length > 0 && (
        <ChartSelector data={normalizeChartData(countAvgPTime)} title="Average Processing Time" />
      )}
    </>
  );
};

export default Chart;