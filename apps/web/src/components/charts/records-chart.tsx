import { useCallback, useMemo } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  RECORD_TYPE,
  Record as RecordType,
  formatSpeed,
  recordTypeLabelMap,
} from '@openathlete/shared';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';

interface P {
  records: RecordType[];
}

export function RecordsChart({ records }: P) {
  const chartData = useMemo(() => {
    const groupedByDistance = records.reduce(
      (acc, record) => {
        const distance = record.distance || 0;

        if (!acc[distance]) {
          acc[distance] = {
            POWER: 0,
            HEARTRATE: 0,
            SPEED: 0,
            CADENCE: 0,
            ELEVATION_GAIN: 0,
            ELEVATION_LOSS: 0,
          };
        }

        acc[distance][record.type] = record.value;

        if (record.type === 'SPEED') {
          acc[distance][record.type] = record.distance / record.value;
        }
        if (
          record.type === 'ELEVATION_GAIN' ||
          record.type === 'ELEVATION_LOSS'
        ) {
          const duration =
            (record.endDuration || 1) - (record.startDuration || 0);
          console.log(record);
          acc[distance][record.type] = record.value / (duration / 3600);
        }

        return acc;
      },
      {} as Record<number, { [key in RECORD_TYPE]: number }>,
    );

    return Object.entries(groupedByDistance)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([distance, values]) => ({
        distance: Number(distance),
        POWER: values[RECORD_TYPE.POWER] || 0,
        HEARTRATE: values[RECORD_TYPE.HEARTRATE] || 0,
        SPEED: values[RECORD_TYPE.SPEED] || 0,
        CADENCE: values[RECORD_TYPE.CADENCE] || 0,
        ELEVATION_GAIN: values[RECORD_TYPE.ELEVATION_GAIN] || 0,
        ELEVATION_LOSS: values[RECORD_TYPE.ELEVATION_LOSS] || 0,
      }));
  }, [records]);

  const typeFormatter = useCallback((value: number, type: RECORD_TYPE) => {
    switch (type) {
      case RECORD_TYPE.SPEED:
        return (
          <>
            {formatSpeed(value)}{' '}
            <span className="font-normal text-muted-foreground">/ km</span>
          </>
        );
      case RECORD_TYPE.POWER:
        return (
          <>
            {Math.round(value)}{' '}
            <span className="font-normal text-muted-foreground">watts</span>
          </>
        );
      case RECORD_TYPE.HEARTRATE:
        return (
          <>
            {Math.round(value)}{' '}
            <span className="font-normal text-muted-foreground">bpm</span>
          </>
        );
      case RECORD_TYPE.CADENCE:
        return (
          <>
            {Math.round(value)}{' '}
            <span className="font-normal text-muted-foreground">rpm</span>
          </>
        );
      case RECORD_TYPE.ELEVATION_GAIN:
        return (
          <>
            {Math.round(value)}{' '}
            <span className="font-normal text-muted-foreground">m/hour</span>
          </>
        );
      case RECORD_TYPE.ELEVATION_LOSS:
        return (
          <>
            {Math.round(value)}{' '}
            <span className="font-normal text-muted-foreground">m/hour</span>
          </>
        );
    }
  }, []);

  return (
    <ChartContainer
      config={{
        POWER: {
          label: 'Power',
        },
        SPEED: {
          label: 'Speed',
        },
        HEARTRATE: {
          label: 'Heart Rate',
        },
        CADENCE: {
          label: 'Cadence',
        },
        ELEVATION_GAIN: {
          label: 'Elevation Gain',
        },
        ELEVATION_LOSS: {
          label: 'Elevation Loss',
        },
      }}
      className="h-[300px] w-full"
    >
      <LineChart data={chartData}>
        <YAxis yAxisId="POWER" hide domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="SPEED" hide domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="HEARTRATE" hide domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="CADENCE" hide domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="ELEVATION_GAIN" hide domain={['dataMin', 'dataMax']} />
        <YAxis yAxisId="ELEVATION_LOSS" hide domain={['dataMin', 'dataMax']} />
        <XAxis dataKey="distance" domain={['dataMin', 'dataMax']} />
        <Line
          type="monotone"
          dataKey="POWER"
          yAxisId="POWER"
          stroke="var(--chart-2)"
          dot={true}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="SPEED"
          yAxisId="SPEED"
          stroke="var(--chart-3)"
          dot={true}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="HEARTRATE"
          yAxisId="HEARTRATE"
          stroke="var(--chart-4)"
          dot={true}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="CADENCE"
          yAxisId="CADENCE"
          stroke="var(--chart-5)"
          dot={true}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="ELEVATION_GAIN"
          yAxisId="ELEVATION_GAIN"
          stroke="var(--chart-4)"
          dot={true}
          strokeWidth={1}
        />
        <Line
          type="monotone"
          dataKey="ELEVATION_LOSS"
          yAxisId="ELEVATION_LOSS"
          stroke="var(--chart-3)"
          dot={true}
          strokeWidth={1}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex min-w-[130px] items-center text-xs text-muted-foreground gap-2">
                  {recordTypeLabelMap[name as RECORD_TYPE]}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {typeFormatter(Number(value), name as RECORD_TYPE)}
                  </div>
                </div>
              )}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
