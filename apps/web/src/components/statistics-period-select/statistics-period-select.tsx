import { useState } from 'react';

import {
  getMonthPeriod,
  getWeekPeriod,
  getYearPeriod,
} from '@openathlete/shared';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface P {
  onChange: (start: Date, end: Date) => void;
  period: { start: Date; end: Date };
}

export function StatisticsPeriodSelect({ onChange, period }: P) {
  const [type, setType] = useState<'week' | 'month' | 'year'>('week');
  const [offset, setOffset] = useState(0);

  const handleChangeType = (t: 'week' | 'month' | 'year') => {
    setType(t);
    let start: Date;
    let end: Date;
    switch (t) {
      case 'week':
        ({ start, end } = getWeekPeriod(new Date()));
        break;
      case 'month':
        ({ start, end } = getMonthPeriod(new Date()));
        break;
      case 'year':
        ({ start, end } = getYearPeriod(new Date()));
        break;
    }
    onChange(start, end);
  };

  const handleOffset = (direction: 'prev' | 'next') => {
    let newOffset = offset;
    if (direction === 'prev') newOffset = offset - 1;
    else newOffset = offset + 1;
    setOffset(newOffset);
    let start: Date;
    let end: Date;

    switch (type) {
      case 'week':
        ({ start, end } = getWeekPeriod(
          new Date(Date.now() + newOffset * 7 * 24 * 60 * 60 * 1000),
        ));
        break;
      case 'month':
        ({ start, end } = getMonthPeriod(
          new Date(Date.now() + newOffset * 30 * 24 * 60 * 60 * 1000),
        ));
        break;
      case 'year':
        ({ start, end } = getYearPeriod(
          new Date(Date.now() + newOffset * 365 * 24 * 60 * 60 * 1000),
        ));
        break;
    }
    onChange(start, end);
  };

  return (
    <Card className="col-span-1">
      <CardContent className="flex justify-between items-center">
        <Tabs
          value={type}
          onValueChange={(t) =>
            handleChangeType(t as 'week' | 'month' | 'year')
          }
        >
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOffset('prev')}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOffset('next')}
          >
            Next
          </Button>
          <Badge>
            {type === 'week'
              ? `${new Date(period.start).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                })} to ${new Date(period.end).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'short',
                })}`
              : type === 'month'
                ? `${new Date(period.start).toLocaleString('en-US', {
                    month: 'long',
                  })} ${new Date(period.start).getFullYear()}`
                : `${new Date(period.start).getFullYear()}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
