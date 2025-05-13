import { TableCell } from "./ui/table";

interface ColoredTableCellProps {
  value: number | string;
  data: Record<string, any>[];
  isColoredTableCellFeatureEnabled: boolean;
  rowKey: string;
  columnKey: string;
  classificationColor?: string; // Add this line
}

export function ColoredTableCell({ 
  value, 
  data, 
  isColoredTableCellFeatureEnabled, 
  rowKey, 
  columnKey,
  classificationColor
}: ColoredTableCellProps) {
  // Extract the numeric value from the string (assuming format like '13772/17.866')
  const extractNumericValue = (val: string | number): number => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const numericPart = val.split('/')[1];
      return parseFloat(numericPart || '0');
    }
    return 0;
  };

  // Determine color based on percentage change
  const determineColor = (currentValue: number, previousValue: number): string => {
    if (currentValue === previousValue) return "text-gray-800 dark:text-gray-200";

    const percentageChange = ((currentValue - previousValue) / previousValue) * 100;

    if (percentageChange > 0) {
      if (percentageChange <= 5) return "text-yellow-500"; // Slight increase
      if (percentageChange <= 10) return "text-orange-500"; // Moderate increase
      if (percentageChange <= 20) return "text-red-500"; // Significant increase
      return "text-red-800"; // Extreme increase
    } else {
      const absPercentageChange = Math.abs(percentageChange);
      if (absPercentageChange <= 5) return "text-green-300"; // Slight decrease
      if (absPercentageChange <= 10) return "text-green-500"; // Moderate decrease
      if (absPercentageChange <= 20) return "text-green-700"; // Significant decrease
      return "text-green-900"; // Extreme decrease
    }
  };

  // Default color when feature is disabled or no color change is applicable
  const defaultColorClass = "text-gray-800 dark:text-gray-200";
  
  // If feature is not enabled, return default color
  if (!isColoredTableCellFeatureEnabled) {
    return <TableCell className={`${defaultColorClass} p-2 rounded-md`}>{value}</TableCell>;
  }

  // Check if this is the api_endpoint column and classificationColor is provided
  if ((columnKey == 'api_endpoint') && classificationColor) {
    return <TableCell className="p-2 rounded-md" style={{ color: classificationColor }}>{value}</TableCell>;
  }

  // Find the current and previous values
  const sortedDates = Object.keys(data[0])
    .filter(key => !['api_endpoint'].includes(key))
    .sort();
  
  const currentIndex = sortedDates.indexOf(columnKey);
  
  let colorClass = defaultColorClass;
  
  if (currentIndex > 0) {
    const previousDate = sortedDates[currentIndex - 1];
    
    // Find the row with the matching API endpoint
    const rowData = data.find(row => row.api_endpoint === rowKey);
    
    if (rowData) {
      const currentValue = extractNumericValue(rowData[columnKey]);
      const previousValue = extractNumericValue(rowData[previousDate]);
      
      colorClass = determineColor(currentValue, previousValue);
    }
  }

  return <TableCell className={`${colorClass} p-2 rounded-md`}>{value}</TableCell>;
}
