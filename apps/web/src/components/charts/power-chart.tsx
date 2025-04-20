import { useMemo } from 'react';
import { Line, LineChart, YAxis } from 'recharts';

import { ActivityStream } from '@openathlete/shared';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface P {
  wattsStream: Exclude<ActivityStream['watts'], undefined>;
  timeStream?: Exclude<ActivityStream['time'], undefined>;
}

export function PowerChart({ wattsStream, timeStream }: P) {
  const chartData = useMemo(() => {
    return wattsStream.map((watts, i) => {
      const time = timeStream ? timeStream[i] : i;
      return {
        watts,
        time: time,
      };
    });
  }, [wattsStream, timeStream]);

  console.log('chartData', chartData);

  const minPower = useMemo(
    () => Math.min(...chartData.map((data) => data.watts)),
    [chartData],
  );
  const maxPower = useMemo(
    () => Math.max(...chartData.map((data) => data.watts)),
    [chartData],
  );

  return (
    <ChartContainer
      config={{
        watts: {
          label: 'Power',
        },
      }}
      className="h-[100px] w-full"
    >
      <LineChart data={chartData}>
        <YAxis type="number" domain={[minPower, maxPower]} hide />
        <Line
          type="monotone"
          dataKey="watts"
          stroke="var(--chart-2)"
          dot={false}
          strokeWidth={1}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex min-w-[130px] items-center text-xs text-muted-foreground gap-2">
                  {name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {Number(value)}{' '}
                    <span className="font-normal text-muted-foreground">
                      watts
                    </span>
                  </div>
                </div>
              )}
            />
          }
        />
      </LineChart>
    </ChartContainer>
  );
}
