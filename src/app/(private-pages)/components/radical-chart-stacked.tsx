'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

const chartConfig = {
    total: {
        label: 'Total',
        color: 'hsl(var(--chart-1))',
    },
    consumed: {
        label: 'Consumed',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

interface RadicalChartStackedProps {
    chartData: { metric: string; total: number; consumed: number };
    title: string;
    description?: string;
    label?: { value: string; text: string };
}

export const RadicalChartStacked: React.FC<RadicalChartStackedProps> = ({ chartData, title, description, label }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription className={!description ? 'sr-only' : ''}>
                    {description || `${title} description`}
                </CardDescription>{' '}
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
                    <RadialBarChart data={[chartData]} endAngle={180} innerRadius={80} outerRadius={130}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            {label ? (
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) - 16}
                                                        className="fill-foreground text-2xl font-bold"
                                                    >
                                                        {label?.value}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 4}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {label?.text}
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            ) : null}
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="total"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-total)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="consumed"
                            fill="var(--color-consumed)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
