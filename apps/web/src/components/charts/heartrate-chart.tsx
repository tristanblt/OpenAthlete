import { useMemo } from 'react';
import { Line, LineChart, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface P {
  heartrateStream: number[];
}

const testZones = [
  {
    min: 0,
    max: 125,
    color: 'blue',
  },
  {
    min: 126,
    max: 150,
    color: 'green',
  },
  {
    min: 151,
    max: 162,
    color: 'yellow',
  },
  {
    min: 163,
    max: 179,
    color: 'orange',
  },
  {
    min: 180,
    max: 300,
    color: 'red',
  },
];

export function HeartrateChart({ heartrateStream }: P) {
  const chartData = useMemo(() => {
    return heartrateStream.map((heartrate, i) => ({
      heartrate,
      time: i,
    }));
  }, [heartrateStream]);

  const minHeartrate = useMemo(
    () => Math.min(...heartrateStream),
    [heartrateStream],
  );
  const maxHeartrate = useMemo(
    () => Math.max(...heartrateStream),
    [heartrateStream],
  );
  const heartrateRange = maxHeartrate - minHeartrate;
  const percentagesHeartrate = testZones
    .map((zone) => ({
      min: (zone.min - minHeartrate) / heartrateRange,
      max: (zone.max - minHeartrate) / heartrateRange,
      color: zone.color,
    }))
    .filter((zone) => zone.min < 1 && zone.max > 0)
    .map((zone) => ({
      ...zone,
      min: 1 - (zone.min < 0 ? 0 : zone.min),
      max: 1 - (zone.max > 1 ? 1 : zone.max),
    }))
    .reverse();

  return (
    <ChartContainer
      config={{
        heartrate: {
          label: 'Heart Rate',
        },
      }}
      className="h-[100px] w-full"
    >
      <LineChart data={chartData}>
        <YAxis type="number" domain={[minHeartrate, maxHeartrate]} hide />
        <defs>
          <linearGradient id="colorUv" y1="0%" x1="0" y2="100%" x2="0">
            {percentagesHeartrate.map((zone, i) => (
              <>
                <stop key={i} offset={zone.max} stopColor={zone.color} />
                <stop key={i + 100} offset={zone.min} stopColor={zone.color} />
              </>
            ))}
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="heartrate"
          stroke="url(#colorUv)"
          dot={false}
          strokeWidth={1}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  );
}
