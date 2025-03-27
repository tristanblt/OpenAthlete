import { useMemo } from 'react';
import { Area, AreaChart } from 'recharts';

import { ChartConfig, ChartContainer } from '../ui/chart';

interface P {
  altitudeStream: number[];
}

const chartConfig = {
  altitude: {
    label: 'Altidude',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function SimpleElevationChart({ altitudeStream }: P) {
  const chartData = useMemo(() => {
    return altitudeStream.map((altitude, i) => ({
      altitude,
      time: i,
    }));
  }, [altitudeStream]);

  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <Area
          type="monotone"
          dataKey="altitude"
          stroke={chartConfig.altitude.color}
          fill={chartConfig.altitude.color}
        />
      </AreaChart>
    </ChartContainer>
  );
}
