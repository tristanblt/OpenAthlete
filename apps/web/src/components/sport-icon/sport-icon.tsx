import biking from '@/assets/icons/sports/biking.svg';
import hiking from '@/assets/icons/sports/hiking.svg';
import rockClimbing from '@/assets/icons/sports/rock_climbing.svg';
import run from '@/assets/icons/sports/run.svg';
import swim from '@/assets/icons/sports/swimming.svg';
import trailRun from '@/assets/icons/sports/trail_run.svg';
import { cn } from '@/utils/shadcn';
import { useMemo } from 'react';

import { SPORT_TYPE } from '@openathlete/shared';

interface P {
  sport: SPORT_TYPE;
  className?: string;
}

export function SportIcon({ sport, className }: P) {
  const icon = useMemo(() => {
    switch (sport) {
      case SPORT_TYPE.RUNNING:
        return run;
      case SPORT_TYPE.TRAIL_RUNNING:
        return trailRun;
      case SPORT_TYPE.CYCLING:
        return biking;
      case SPORT_TYPE.SWIMMING:
        return swim;
      case SPORT_TYPE.HIKING:
        return hiking;
      case SPORT_TYPE.ROCK_CLIMBING:
        return rockClimbing;
    }
  }, [sport]);

  if (!icon) {
    return null;
  }
  return <img src={icon} alt={sport} className={cn('w-4 h-4', className)} />;
}
