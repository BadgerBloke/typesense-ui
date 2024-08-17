'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

type MaxFiveItemsArray<T> = [T, T?, T?, T?, T?];
type ChartData = { category: string; metric: number; fill?: string };

interface BarChartMixedProps {
    chartData: MaxFiveItemsArray<ChartData>;
    title: string;
    description?: string;
    label?: { value: string; text: string };
}

const BarChartMixed: React.FC<BarChartMixedProps> = ({ chartData, title, description }) => {
    const chartConfig: { [x: string]: { label: string; color?: string } } = {} satisfies ChartConfig;
    const revisedChartData = chartData.map((d, i) => {
        chartConfig[d!.category] = { label: d!.category.fromCamelToSpaceSeparated(), color: `hsl(var(--chart-${i + 1}))` };
        return { ...d, fill: `var(--color-${d!.category})` };
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className={!description ? 'sr-only' : ''}>
                    {description || `${title} description`}
                </CardDescription>{' '}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={revisedChartData}
                        layout="vertical"
                        margin={{
                            left: 16,
                        }}
                    >
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label}
                        />
                        <XAxis dataKey="metric" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="metric" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BarChartMixed;
