'use client';

import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

type MaxFiveItemsArray<T> = [T, T?, T?, T?, T?];
type ChartData = { category: string; metric: number; fill?: string };

interface PieChartDonutActiveProps {
    chartData: MaxFiveItemsArray<ChartData>;
    title: string;
    description?: string;
    label?: { value: string; text: string };
}

const PieChartDonutActive: React.FC<PieChartDonutActiveProps> = ({ chartData, title, description, label }) => {
    const chartConfig: { [x: string]: { label: string; color?: string } } = {} satisfies ChartConfig;
    const revisedChartData = chartData.map((d, i) => {
        chartConfig[d!.category] = { label: d!.category.fromCamelToSpaceSeparated(), color: `hsl(var(--chart-${i + 1}))` };
        return { ...d, fill: `var(--color-${d!.category})` };
    });
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription className={!description ? 'sr-only' : ''}>
                    {description || `${title} description`}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={revisedChartData}
                            dataKey="metric"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={0}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <Sector {...props} outerRadius={outerRadius + 10} />
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {label?.value}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {label?.text}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default PieChartDonutActive;
