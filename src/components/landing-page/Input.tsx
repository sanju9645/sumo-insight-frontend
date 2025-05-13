// components/landing-page/Input.tsx
import React from 'react';
import { DatePicker } from "../DatePicker";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

interface InputProps {
  selectedStartDate: Date;
  selectedEndDate: Date;
  handleStartDateChange: (date: Date | undefined) => void;
  handleEndDateChange: (date: Date | undefined) => void;
  handleSearch: () => void;
  isColoredTableCellFeatureEnabled: boolean;
  toggleTableRawColorChangeFeature: () => void;
  isChartAnalysisFeatureEnabled: boolean;
  toggleChartAnalysisFeature: () => void;
}

const Input: React.FC<InputProps> = ({
  selectedStartDate,
  selectedEndDate,
  handleStartDateChange,
  handleEndDateChange,
  handleSearch,
  isColoredTableCellFeatureEnabled,
  toggleTableRawColorChangeFeature,
  isChartAnalysisFeatureEnabled,
  toggleChartAnalysisFeature
}) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-4">
      <DatePicker
        name="Start"
        id="start_date"
        value={selectedStartDate}
        onChange={handleStartDateChange}
      />

      <DatePicker
        name="End"
        id="end_date"
        value={selectedEndDate}
        onChange={handleEndDateChange}
      />

      <Button className="font-bold text-center" onClick={handleSearch}>
        Search
      </Button>

      <div className="flex items-center space-x-2">
        <Switch
          id="color-change-toggle"
          checked={isColoredTableCellFeatureEnabled}
          onCheckedChange={toggleTableRawColorChangeFeature}
        />
        <label 
          htmlFor="color-change-toggle" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Enable Cell Color Changes
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="chart-analysis-toggle"
          checked={isChartAnalysisFeatureEnabled}
          onCheckedChange={toggleChartAnalysisFeature}
        />
        <label 
          htmlFor="chart-analysis-toggle" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Enable Chart Analysis
        </label>
      </div>
    </div>
  );
};

export default Input;