import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { siteContents } from "../lib/siteContents";
import { SumoApiLogs } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetSumoLogs = (startDate?: Date, endDate?: Date) => {
  const { getAccessTokenSilently } = useAuth0();
  const [apiLogs, setApiLogs] = useState<SumoApiLogs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!startDate || !endDate) return;

      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");
        const getSumoLogsApi = `${API_BASE_URL}${siteContents.apis.getSumoLogsApi}?start=${formattedStartDate}&end=${formattedEndDate}`;
        
        const response = await fetch(getSumoLogsApi, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching logs: ${response.statusText}`);
        }
        const data = await response.json();
        setApiLogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [startDate, endDate, getAccessTokenSilently]);

  if (error) {
    toast.error(error.toString());
  }

  return { apiLogs, isLoading, error };
};

export const useGetApiEndpoints = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [apiEndpointsData, setApiEndpointsData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllApiEndpointsApi = `${API_BASE_URL}${siteContents.apis.getAllApiEndpointsApi}`;

  useEffect(() => {
    const fetchApiEndpoints = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(getAllApiEndpointsApi, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching API endpoints: ${response.statusText}`);
        }

        const data = await response.json();
        setApiEndpointsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApiEndpoints();
  }, [getAccessTokenSilently]);

  return { apiEndpointsData, isLoading, error };
};