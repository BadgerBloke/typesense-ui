// import Image from 'next/image';

import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import Typography from '~/components/atoms/typography';
import { client } from '~/lib/services/typesense';
import { bytesToMB } from '~/lib/utils';

import BarChartMixed from './components/bar-chart-mixed';
import PieChartDonutActive from './components/pie-chart-donut-active';
import { RadicalChartStacked } from './components/radical-chart-stacked';

const HomePage = async () => {
    const [health, metrics] = await Promise.all([client.health.retrieve(), client.metrics.retrieve()]);

    return (
        <div className="flex flex-col gap-4 items-center">
            {health.ok ? (
                <Typography
                    variant="small"
                    className="text-emerald-500 border border-emerald-500 bg-emerald-50 w-fit rounded-full inline-flex gap-1 h-fit items-center px-2 py-1"
                >
                    <CheckCircledIcon className="h-4 w-4" /> System is steady
                </Typography>
            ) : (
                <Typography
                    variant="small"
                    className="text-rose-500 border border-rose-500 bg-rose-50 rounded-full w-fit inline-flex gap-1 h-fit items-center px-2 py-1"
                >
                    <CrossCircledIcon className="h-4 w-4" /> System isn&apos;t steady
                </Typography>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
                <PieChartDonutActive
                    chartData={[
                        {
                            category: 'used',
                            metric: bytesToMB(metrics.system_disk_used_bytes),
                        },
                        {
                            category: 'total',
                            metric: bytesToMB(+metrics.system_disk_total_bytes - +metrics.system_disk_used_bytes),
                        },
                    ]}
                    title="System Disk Usage"
                    description="Should ideally be below 80%. (Values in MB)"
                    label={{
                        value: `${((+metrics.system_disk_used_bytes / +metrics.system_disk_total_bytes) * 100).toFixed(2)}%`,
                        text: 'Consumed',
                    }}
                />
                <PieChartDonutActive
                    chartData={[
                        {
                            category: 'used',
                            metric: bytesToMB(metrics.system_memory_used_bytes),
                        },
                        {
                            category: 'total',
                            metric: bytesToMB(+metrics.system_memory_total_bytes - +metrics.system_memory_used_bytes),
                        },
                    ]}
                    title="System Memory Usage"
                    description="RAM Usage + Swap Usage must be less than your cluster's total RAM for writes to be processed. (Values in MB)"
                    label={{
                        value: `${((+metrics.system_memory_used_bytes / +metrics.system_memory_total_bytes) * 100).toFixed(2)}%`,
                        text: 'Consumed',
                    }}
                />
                <BarChartMixed
                    chartData={[
                        {
                            category: 'received',
                            metric: bytesToMB(metrics.system_network_received_bytes),
                        },
                        {
                            category: 'sent',
                            metric: bytesToMB(metrics.system_network_sent_bytes),
                        },
                    ]}
                    title="Network Usage"
                    description="Network sent and received stats. (Values in MB)"
                    layout="vertical"
                />
                <PieChartDonutActive
                    chartData={[
                        {
                            category: 'allocated',
                            metric: bytesToMB(metrics.typesense_memory_allocated_bytes),
                        },
                        {
                            category: 'active',
                            metric: bytesToMB(
                                +metrics.typesense_memory_active_bytes - +metrics.typesense_memory_allocated_bytes
                            ),
                        },
                    ]}
                    title="Typesense Memory Allocation"
                    label={{
                        value: `${((+metrics.typesense_memory_allocated_bytes / +metrics.typesense_memory_active_bytes) * 100).toFixed(2)}%`,
                        text: 'Allocated',
                    }}
                />
                <RadicalChartStacked
                    chartData={{
                        total: 1 - +metrics.typesense_memory_fragmentation_ratio,
                        consumed: +metrics.typesense_memory_fragmentation_ratio,
                        metric: 'Disk',
                    }}
                    title="Typesense Memory Fragmentation Ratio"
                    label={{
                        text: 'Ratio',
                        value: metrics.typesense_memory_fragmentation_ratio,
                    }}
                />
                <BarChartMixed
                    chartData={[
                        {
                            category: 'mapped',
                            metric: bytesToMB(metrics.typesense_memory_mapped_bytes),
                        },
                        {
                            category: 'metadata',
                            metric: bytesToMB(metrics.typesense_memory_metadata_bytes),
                        },
                        {
                            category: 'resident',
                            metric: bytesToMB(metrics.typesense_memory_resident_bytes),
                        },
                        {
                            category: 'retained',
                            metric: bytesToMB(metrics.typesense_memory_retained_bytes),
                        },
                    ]}
                    title="Typesense Memory - Additional Stats"
                />
            </div>
        </div>
    );
};

export default HomePage;
