import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { siteContents } from "../lib/siteContents";
import { AlertConfiguration } from "../components/configuration-page/AlertConfigurationSection";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const insightConfigure = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const configureInsight = async (notesDescription: string, sumologicQuery: string, selectedApiColors: Record<string, string>, alertConfig?: AlertConfiguration): Promise<boolean> => {
    setIsLoading(true);
    const insightConfigureApi = `${API_BASE_URL}${siteContents.apis.insightConfigureApi}`;
    
    try {
      const accessToken = await getAccessTokenSilently();
      const requestBody: any = { 
        notesDescription, 
        sumologicQuery, 
        selectedApiColors 
      };

      // Only include alertConfig if it exists
      if (alertConfig) {
        requestBody.alertConfig = alertConfig;
      }

      const response = await fetch(insightConfigureApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success('Configuration saved successfully!');
        return true;
      }
      throw new Error('Failed to save configuration.');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      toast.error(err instanceof Error ? err.message : "An error occurred while saving configuration.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { configureInsight, isLoading, error };
};

export const useGetInsightConfigure = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notesDescription, setNotesDescription] = useState<string>('');
  const [sumologicQuery, setSumologicQuery] = useState<string>('');
  const [alertConfig, setAlertConfig] = useState<AlertConfiguration | null>(null);

  useEffect(() => {
    const fetchConfiguration = async () => {
      setIsLoading(true);
      const insightConfigureApi = `${API_BASE_URL}${siteContents.apis.getConfigureInsightApi}`;

      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(insightConfigureApi, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const config = await response.json();

          if (config && Array.isArray(config)) {
            const notes = config.find(item => item.key === "notesDescription");
            const query = config.find(item => item.key === "sumologicQuery");
            const alertConfig = config.find(item => item.key === "alertConfig");
            if (notes) setNotesDescription(notes.content);
            if (query) setSumologicQuery(query.content);
            if (alertConfig) setAlertConfig(alertConfig.content as AlertConfiguration);
          }

          toast.success('Configuration retrieved successfully!');
        } else {
          throw new Error(`Failed to retrieve configuration: ${response.statusText}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(err instanceof Error ? err.message : "An error occurred while retrieving configuration.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfiguration();
  }, [getAccessTokenSilently]);

  if (error) {
    toast.error(error.toString());
  }

  return { 
    notesDescription, 
    setNotesDescription, 
    sumologicQuery, 
    setSumologicQuery, 
    alertConfig, 
    setAlertConfig, 
    isLoading, 
    error 
  };
};