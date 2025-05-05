import { m } from '@/paraglide/messages';
import { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';

import {
  GetStatisticsForPeriodDto,
  sportTypeLabelMap,
} from '@openathlete/shared';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface P {
  sports: GetStatisticsForPeriodDto['sports'];
  keyToUse: keyof Omit<GetStatisticsForPeriodDto['sports'][0], 'sport'>;
  formatter?: (value: number) => string;
}

export function SportDistributionChart({ sports, keyToUse, formatter }: P) {
  const chartData = useMemo(() => {
    return sports.map((sport, i) => ({
      fill: `var(--chart-${(i % 5) + 1})`,
      value: sport[keyToUse],
      name: sportTypeLabelMap[sport.sport],
    }));
  }, [sports, keyToUse]);

  const total = useMemo(
    () => sports.reduce((acc, v) => acc + v[keyToUse], 0),
    [sports, keyToUse],
  );

  return (
    <ChartContainer
      config={{
        sport: {
          label: m.sport(),
        },
      }}
      className="h-[300px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="flex min-w-[130px] items-center text-xs text-muted-foreground gap-2">
                  {name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {Math.round((Number(value) / total) * 100)}
                    <span className="font-normal text-muted-foreground">
                      {m.percent_symbol()}
                    </span>
                  </div>
                  {formatter && <div>{formatter(Number(value))}</div>}
                </div>
              )}
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        />
      </PieChart>
    </ChartContainer>
  );
}
