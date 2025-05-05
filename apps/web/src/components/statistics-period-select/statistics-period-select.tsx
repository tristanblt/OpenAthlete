import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';
import { getDateLocale } from '@/utils/locales';
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
  className?: string;
}

export function StatisticsPeriodSelect({ onChange, period, className }: P) {
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
    <Card className={className}>
      <CardContent className="flex justify-between items-center">
        <Tabs
          value={type}
          onValueChange={(t) =>
            handleChangeType(t as 'week' | 'month' | 'year')
          }
        >
          <TabsList>
            <TabsTrigger value="week">{m.week()}</TabsTrigger>
            <TabsTrigger value="month">{m.month()}</TabsTrigger>
            <TabsTrigger value="year">{m.year()}</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOffset('prev')}
          >
            {m.prev()}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOffset('next')}
            disabled={offset >= 0}
          >
            {m.next()}
          </Button>
          <Badge>
            {type === 'week'
              ? `${new Date(period.start).toLocaleString(
                  getDateLocale(getLocale()),
                  {
                    day: 'numeric',
                    month: 'short',
                  },
                )} ${m.to()} ${new Date(period.end).toLocaleString(
                  getDateLocale(getLocale()),
                  {
                    day: 'numeric',
                    month: 'short',
                  },
                )}`
              : type === 'month'
                ? `${new Date(period.start).toLocaleString(
                    getDateLocale(getLocale()),
                    {
                      month: 'long',
                    },
                  )} ${new Date(period.start).getFullYear()}`
                : `${new Date(period.start).getFullYear()}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
