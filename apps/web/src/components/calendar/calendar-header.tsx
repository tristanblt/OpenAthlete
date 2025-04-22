import { useState } from 'react';

import {
  EVENT_TYPE,
  Event,
  SPORT_TYPE,
  sportTypeLabelMap,
} from '@openathlete/shared';

import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useCalendarContext } from './hooks/use-calendar-context';
import { COLORED_BY, coloredByLabelMap } from './types/filter';

interface P {}

export function CalendarHeader({}: P) {
  const {
    nextMonth,
    prevMonth,
    displayedMonth,
    setFilter,
    coloredBy,
    setColoredBy,
  } = useCalendarContext();
  const [sportFilter, setSportFilter] = useState<SPORT_TYPE | ''>('');

  const handleChangeSportFilter = (value: string | null) => {
    setSportFilter(value as SPORT_TYPE);

    if (!value) {
      setFilter(() => () => true);
    } else {
      setFilter(
        () => (event: Event) =>
          event.type !== EVENT_TYPE.NOTE && event.sport === value,
      );
    }
  };

  const displayedMonthString = displayedMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">
        Calendar of {displayedMonthString}
      </h1>
      <div className="flex gap-2">
        <Select
          value={coloredBy || ''}
          onValueChange={(c) =>
            setColoredBy(c === '' ? null : (c as COLORED_BY))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Colored by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null!}>Colored by</SelectItem>
            {Object.values(COLORED_BY).map((colorProfile) => (
              <SelectItem key={colorProfile} value={colorProfile}>
                {coloredByLabelMap[colorProfile]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sportFilter} onValueChange={handleChangeSportFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null!}>All Sports</SelectItem>
            {Object.values(SPORT_TYPE).map((sportType) => (
              <SelectItem key={sportType} value={sportType}>
                {sportTypeLabelMap[sportType]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => prevMonth()}>Prev</Button>
        <Button onClick={() => nextMonth()}>Next</Button>
      </div>
    </div>
  );
}
