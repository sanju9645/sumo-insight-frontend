import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';

import { ChartType } from '../../types';
import { AreaChartComponent } from './AreaChartComponent';
import { LineChartComponent } from './LineChartComponent';
import { BarChartComponent } from './BarChartComponent';

interface ChartSelectorProps {
  data: Record<string, any>[];
  title: string;
}

export function ChartSelector({ data, title }: ChartSelectorProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  
  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return <AreaChartComponent data={data} title={title} />;
      case 'line':
        return <LineChartComponent data={data} title={title} />;
      case 'bar':
        return <BarChartComponent data={data} title={title} />;
      default:
        return <LineChartComponent data={data} title={title} />;
    }
  };

  return (
    <div className="space-y-4 mt-10">
      <div className="flex justify-end items-center">
        <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
          <SelectTrigger className="border-gray-300 dark:border-white w-fit inline-flex">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
            <SelectItem value="bar">Bar Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {renderChart()}
    </div>
  );
} 