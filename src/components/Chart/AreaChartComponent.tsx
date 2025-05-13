import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "../ui/chart";
import { AreaChartComponentProps } from "../../types";

type Props = AreaChartComponentProps & { title: string };

export function AreaChartComponent({ data, title }: Props) {
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
        <CardDescription>Shows API usage and response time trends.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.keys(chartConfig).map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
          </AreaChart>
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
