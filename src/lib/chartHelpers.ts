import { ChartTransformedData, ApiLog,LineChartComponentProps, ChartData } from "../types";

export const chartTransformApiLogs = (apiLogs: ApiLog[], selectedApis: string[]) => {
  const countDataMap: Record<string, ChartTransformedData> = {};
  const countAvgPTimeMap: Record<string, ChartTransformedData> = {};

  apiLogs.forEach(({ date, api_endpoint, count, avg_p_time }) => {
    if (api_endpoint && selectedApis.includes(api_endpoint)) {
      if (!countDataMap[date]) {
        countDataMap[date] = { date };
        countAvgPTimeMap[date] = { date };
      }

      countDataMap[date][api_endpoint] = count ?? 0;
      countAvgPTimeMap[date][api_endpoint] = avg_p_time ?? "0";
    }
  });

  const countData: ChartTransformedData[] = Object.values(countDataMap);
  const countAvgPTime: ChartTransformedData[] = Object.values(countAvgPTimeMap);

  return { countData, countAvgPTime };
};

export const normalizeChartData = (data: ChartData[]) => {
  const allKeys = Array.from(
    new Set(
      data.flatMap((entry) =>
        Object.keys(entry)
          .filter((key) => key !== "date")
          .map((key) => key.replace(/\//g, "_"))
      )
    )
  );

  return data.map((entry) => {
    const normalizedEntry: ChartData = { date: entry.date };
    allKeys.forEach((key) => {
      const originalKey = Object.keys(entry).find((k) => k.replace(/\//g, "_") === key);
      normalizedEntry[key] = originalKey ? entry[originalKey] : 0;  // Default to 0 instead of null
    });
    return normalizedEntry;
  });
};
