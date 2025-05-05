import { m } from '@/paraglide/messages';
import { getLocale } from '@/paraglide/runtime';
import { getDateLocale } from '@/utils/locales';
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

  const displayedMonthString = displayedMonth.toLocaleString(
    getDateLocale(getLocale()),
    {
      month: 'long',
      year: 'numeric',
    },
  );
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">
        {m.calendar_of({ month: displayedMonthString })}
      </h1>
      <div className="flex gap-2">
        <Select
          value={coloredBy || ''}
          onValueChange={(c) =>
            setColoredBy(c === '' ? null : (c as COLORED_BY))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={m.colored_by()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null!}>{m.colored_by()}</SelectItem>
            {Object.values(COLORED_BY).map((colorProfile) => (
              <SelectItem key={colorProfile} value={colorProfile}>
                {coloredByLabelMap[colorProfile]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sportFilter} onValueChange={handleChangeSportFilter}>
          <SelectTrigger>
            <SelectValue placeholder={m.all_sports()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null!}>{m.all_sports()}</SelectItem>
            {Object.values(SPORT_TYPE).map((sportType) => (
              <SelectItem key={sportType} value={sportType}>
                {sportTypeLabelMap[sportType]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => prevMonth()}>{m.prev()}</Button>
        <Button onClick={() => nextMonth()}>{m.next()}</Button>
      </div>
    </div>
  );
}
