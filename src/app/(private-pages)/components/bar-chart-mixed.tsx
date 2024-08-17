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
    layout?: 'horizontal' | 'vertical';
}

const BarChartMixed: React.FC<BarChartMixedProps> = ({ chartData, title, description, layout = 'horizontal' }) => {
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
                        layout={layout}
                        margin={{
                            left: layout === 'vertical' ? 16 : 0,
                        }}
                    >
                        <YAxis
                            dataKey={layout === 'vertical' ? 'category' : 'metric'}
                            type={layout === 'vertical' ? 'category' : 'number'}
                            tickLine={layout === 'vertical' ? false : undefined}
                            tickMargin={layout === 'vertical' ? 10 : undefined}
                            axisLine={layout === 'vertical' ? false : undefined}
                            tickFormatter={
                                layout === 'vertical'
                                    ? value => chartConfig[value as keyof typeof chartConfig]?.label
                                    : undefined
                            }
                            hide={layout === 'horizontal'}
                        />
                        <XAxis
                            dataKey={layout === 'horizontal' ? 'category' : 'metric'}
                            type={layout === 'horizontal' ? 'category' : 'number'}
                            tickLine={layout === 'horizontal' ? false : undefined}
                            tickMargin={layout === 'horizontal' ? 10 : undefined}
                            axisLine={layout === 'horizontal' ? false : undefined}
                            tickFormatter={
                                layout === 'horizontal'
                                    ? value => chartConfig[value as keyof typeof chartConfig]?.label
                                    : undefined
                            }
                            hide={layout === 'vertical'}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar dataKey="metric" layout={layout} radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BarChartMixed;
