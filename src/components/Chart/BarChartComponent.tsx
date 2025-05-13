import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { BarChartComponentProps } from "../../types";

type Props = BarChartComponentProps & { title: string };

export function BarChartComponent({ data, title }: Props) {
  const chartConfig: ChartConfig = Object.keys(data[0] || {})
    .filter((key) => key !== "date")
    .reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: {
          label: key.replace(/_/g, " "),
          color: `hsl(var(--chart-${index + 1}))`,
        },
      }),
      {}
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>API {title} Performance Chart</CardTitle>
        <CardDescription>Shows API usage and performance metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                fillOpacity={0.7}
                stackId="a"
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this date <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              API performance overview
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 