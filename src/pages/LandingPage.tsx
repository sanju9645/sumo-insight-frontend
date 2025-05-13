import { useState, useEffect } from "react";
import { toast } from "sonner";

import { DataTable } from '../components/DataTable';
import Input from '../components/landing-page/Input';
import Chart from "../components/landing-page/Chart";
import { useGetSumoLogs } from "../apis/SumoLogsApi";
import { siteContents } from "../lib/siteContents";
import { dataTableTransformApiLogs } from "../lib/dataTableHelpers";
import { chartTransformApiLogs } from "../lib/chartHelpers";
import { useGetInsightConfigure } from "../apis/insightConfigure";

const LandingPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [fetchDates, setFetchDates] = useState({ start: new Date(), end: new Date() });
  const { apiLogs, isLoading: isGetLoading } = useGetSumoLogs(fetchDates.start, fetchDates.end);
  const { headers, sortedDates, sortedEndpoints, transformedData } = dataTableTransformApiLogs(apiLogs);
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const { countData, countAvgPTime } = chartTransformApiLogs(apiLogs, selectedApis);
  const [isColoredTableCellFeatureEnabled, setisColoredTableCellFeatureEnabled] = useState(false);
  const [isChartAnalysisFeatureEnabled, setisChartAnalysisFeatureEnabled] = useState(false);
  const { notesDescription } = useGetInsightConfigure();

  const toggleTableRawColorChangeFeature = () => setisColoredTableCellFeatureEnabled(!isColoredTableCellFeatureEnabled);
  const toggleChartAnalysisFeature = () => setisChartAnalysisFeatureEnabled(!isChartAnalysisFeatureEnabled);

  const handleStartDateChange = (date: Date | undefined) => {
    if (date && selectedEndDate && date > selectedEndDate) {
      setError("Start date cannot be after End date.");
    } else {
      setError(null);
      setSelectedStartDate(date || new Date());
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date && selectedStartDate && date < selectedStartDate) {
      setError("End date cannot be before Start date.");
    } else {
      setError(null);
      setSelectedEndDate(date || new Date());
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    console.log("Fetching logs with dates:");
  }, [fetchDates]);

  const handleSearch = () => {
    setFetchDates({
      start: selectedStartDate || new Date(),
      end: selectedEndDate || new Date(),
    });
  };

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!apiLogs) {
    return <span> {siteContents.texts.apiLogsEmptyText} </span>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">API Analysis</h1>
        
        <Input
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleSearch={handleSearch}
          isColoredTableCellFeatureEnabled={isColoredTableCellFeatureEnabled}
          toggleTableRawColorChangeFeature={toggleTableRawColorChangeFeature}
          isChartAnalysisFeatureEnabled={isChartAnalysisFeatureEnabled}
          toggleChartAnalysisFeature={toggleChartAnalysisFeature}
        />

        <div className="mt-5 mb-4" dangerouslySetInnerHTML={{ __html: notesDescription }}></div>

        <DataTable data={transformedData} header={headers} isColoredTableCellFeatureEnabled={isColoredTableCellFeatureEnabled} />

        {isChartAnalysisFeatureEnabled && (
          <Chart
            sortedEndpoints={sortedEndpoints}
            selectedApis={selectedApis}
            setSelectedApis={setSelectedApis}
            countData={countData}
          countAvgPTime={countAvgPTime}
          />
        )}
      </div>
    </>
  );
};

export default LandingPage;
