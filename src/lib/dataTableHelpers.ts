import { DataTableTransformedLog, ApiLog } from "../types";
import {convertMillisecondsToSeconds } from "../lib/helpers";

export const dataTableTransformApiLogs = (apiLogs: ApiLog[]) => {
  const groupedData: Record<string, DataTableTransformedLog> = {};
  const uniqueDates = new Set<string>();
  const uniqueEndpoints = new Set<string>();

  apiLogs.forEach(({ api_endpoint, date, count, avg_p_time, classification_color }) => {
    if (api_endpoint && count !== null && avg_p_time !== null) {
      uniqueDates.add(date);
      uniqueEndpoints.add(api_endpoint);

      if (!groupedData[api_endpoint]) {
        groupedData[api_endpoint] = { api_endpoint };
        
        if (classification_color !== undefined) {
          groupedData[api_endpoint].classification_color = classification_color;
        }
      }
      const roundedAvgPTime = convertMillisecondsToSeconds(Number(avg_p_time));
      
      groupedData[api_endpoint][date] = `${count}/${roundedAvgPTime}`;
    }
  });

  const sortedDates = Array.from(uniqueDates).sort();
  const sortedEndpoints = Array.from(uniqueEndpoints).sort();

  const headers: Record<string, string> = {
    id: '#',
    api_endpoint: "API Endpoint",
    ...Object.fromEntries(
      sortedDates.map(date => {
        const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
        return [date, `${date} ${dayOfWeek}`];
      })
    ),
  };

  const transformedData = Object.values(groupedData).map((entry, index) => ({
    ...entry,
    id: index + 1,
  }));

  return { headers, sortedDates, sortedEndpoints, transformedData };
};
