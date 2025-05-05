import { useTrainingZones } from '@/hooks/use-training-zones';
import { m } from '@/paraglide/messages';
import { useMemo } from 'react';
import { Line, LineChart, YAxis } from 'recharts';

import {
  ActivityStream,
  SPORT_TYPE,
  TRAINING_ZONE_TYPE,
} from '@openathlete/shared';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface P {
  heartrateStream: Exclude<ActivityStream['heartrate'], undefined>;
  sport?: SPORT_TYPE;
}

export function HeartrateChart({ heartrateStream, sport }: P) {
  const trainingZones = useTrainingZones(TRAINING_ZONE_TYPE.HEARTRATE, sport);

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
  const percentagesHeartrate = trainingZones
    ?.map((zone) => ({
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
          label: m.heart_rate(),
        },
      }}
      className="h-[100px] w-full"
    >
      <LineChart data={chartData} syncId="event">
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
