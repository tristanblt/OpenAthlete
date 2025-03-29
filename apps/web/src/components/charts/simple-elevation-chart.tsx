import { useMemo } from 'react';
import { Area, AreaChart } from 'recharts';

import { ActivityStream } from '@openathlete/shared';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

interface P {
  altitudeStream: Exclude<ActivityStream['altitude'], undefined>;
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
        <ChartTooltip content={<ChartTooltipContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
