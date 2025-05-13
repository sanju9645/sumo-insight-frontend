import { useState, useEffect } from "react";
import { toast } from "sonner";

import BackToMainPageButton from "../components/BackToMainPageButton";
import TextEditor from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import { siteContents } from "../lib/siteContents";
import { useTheme } from "../components/theme/ThemeProvider";
import { Button } from "../components/ui/button";
import { insightConfigure, useGetInsightConfigure } from "../apis/insightConfigure";
import { DropdownColorPicker } from "../components/DropdownColorPicker";
import { useGetApiEndpoints } from "../apis/SumoLogsApi";
import AlertConfigurationSection, { AlertConfiguration } from "../components/configuration-page/AlertConfigurationSection";

interface ApiEndpointData {
  api_endpoint: string;
  classification_color?: string;
  [key: string]: any; // For any other properties
}

const InsightConfigurePage = () => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const bgColor2 = theme === "dark" ? colors.bgLight2 : colors.bgDark2;
  const { configureInsight, isLoading } = insightConfigure();
  const { 
    notesDescription, 
    setNotesDescription, 
    sumologicQuery, 
    setSumologicQuery, 
    alertConfig,
    setAlertConfig,
    isLoading: isGetLoading,
  } = useGetInsightConfigure();
  const [selectedApiColors, setSelectedApiColors] = useState<Record<string, string>>({});
  const [endpointArray, setEndpointArray] = useState<string[]>([]);
  const navigate = useNavigate();
  const { apiEndpointsData, isLoading: isGetApiEndpointsLoading, error: getApiEndpointsError } = useGetApiEndpoints();
  
  useEffect(() => {
    if (getApiEndpointsError) {
      toast.error(getApiEndpointsError);
    }
  }, [getApiEndpointsError]);

  const apiEndpointsList = (apiEndpointsData || []).map(endpoint => {
    if (typeof endpoint === 'object' && endpoint && 'api_endpoint' in (endpoint as any)) {
      return endpoint as ApiEndpointData;
    }
    return { api_endpoint: endpoint as string };
  });

  useEffect(() => {
    const endpointStrings = apiEndpointsList.map(endpoint => endpoint?.api_endpoint);
    setEndpointArray(endpointStrings);
  }, [apiEndpointsData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, redirect: boolean) => {
    e.preventDefault();
    const success = await configureInsight(notesDescription, sumologicQuery, selectedApiColors, alertConfig || undefined);
    if (success && redirect) {
      navigate(siteContents.pages.apiInsight);
    }
  };

  const handleButtonClick = async (redirect: boolean) => {
    const success = await configureInsight(notesDescription, sumologicQuery, selectedApiColors, alertConfig || undefined);
    if (success && redirect) {
      navigate(siteContents.pages.apiInsight);
    }
  };

  const handleAlertConfigChange = (config: AlertConfiguration) => {
    if (JSON.stringify(config) !== JSON.stringify(alertConfig)) {
      setAlertConfig(config);
    }
  };

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <div>
        <BackToMainPageButton />
        <h1 className="mt-5 text-2xl font-bold">Insight Configure Page</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="mt-5">
        <h2 className="text-lg font-bold mt-5">Notes:</h2>
        <TextEditor value={notesDescription} onChange={setNotesDescription} />

        <h2 className="text-lg font-bold mt-5">Sumologic Query:</h2>
        <textarea
          value={sumologicQuery}
          onChange={(e) => setSumologicQuery(e.target.value)}
          className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
          rows={5}
        />

        <DropdownColorPicker
          apiEndpoints={apiEndpointsList}
          selectedApiColors={selectedApiColors}
          setSelectedApiColors={setSelectedApiColors}
        />

        {/* Alert Configuration Section */}
        <AlertConfigurationSection 
          endpointArray={endpointArray} 
          onConfigChange={handleAlertConfigChange}
          initialAlertConfig={alertConfig || undefined} 
        />

        
        <div className="flex justify-between mt-5">
          <Button
            type="submit"
            className={`flex items-center px-3 font-bold hover:${bgColor2}`}
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleButtonClick(false);
            }}
          >
            <span>{siteContents.buttons.btnLabel5}</span>
          </Button>

          <Button
            type="button"
            className={`flex items-center px-3 font-bold hover:${bgColor2}`}
            disabled={isLoading}
            onClick={() => handleButtonClick(true)}
          >
            <span>{siteContents.buttons.btnLabel6}</span>
          </Button>
        </div>
      </form>
    </>
  );
}

export default InsightConfigurePage;