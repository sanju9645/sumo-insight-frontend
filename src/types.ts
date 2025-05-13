export type User = {
  _id: string;
  email: string;
  name: string;
  username: string;
  isAdmin: Boolean;
  profilePic: string;
};


export type SumoApiLogs = {
  id: number;
  created: string;
  date: string;
  api_endpoint: string | null;
  count: number | null;
  avg_p_time: string | null;
}

export type DataTableTransformedLog = {
  api_endpoint: string;
  [date: string]: string;
};

export interface ApiLog {
  id: number;
  date: string;
  api_endpoint: string | null;
  count: number | null;
  avg_p_time: string | null;
  classification_color?: string;
}

export type ChartTransformedData = {
  date: string;
  [apiEndpoint: string]: number | string;
};

export type ChartData = {
  date: string;
  [key: string]: number | string;
};

export type ChartType = 'area' | 'line' | 'bar';

export interface BaseChartComponentProps {
  data: Record<string, any>[];
  title: string;
}

export interface AreaChartComponentProps extends BaseChartComponentProps {}
export interface LineChartComponentProps extends BaseChartComponentProps {}
export interface BarChartComponentProps extends BaseChartComponentProps {}
