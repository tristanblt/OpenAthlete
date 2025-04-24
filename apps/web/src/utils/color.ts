import { EVENT_TYPE, SPORT_TYPE } from '@openathlete/shared';

export const getHighSaturatedRpeColor = (
  rpe: number,
  border: boolean = true,
) => {
  if (rpe <= 0.2)
    return `bg-green-500 hover:bg-green-600 ${border ? `border-green-700` : ''}`;
  if (rpe <= 0.4)
    return `bg-lime-500 hover:bg-lime-600 ${border ? `border-lime-700` : ''}`;
  if (rpe <= 0.6)
    return `bg-yellow-500 hover:bg-yellow-600 ${border ? `border-yellow-700` : ''}`;
  if (rpe <= 0.8)
    return `bg-orange-500 hover:bg-orange-600 ${border ? `border-orange-700` : ''}`;
  return `bg-red-500 hover:bg-red-600 ${border ? `border-red-700` : ''}`;
};

export const getLowSaturatedRpeColor = (
  rpe: number,
  border: boolean = true,
) => {
  if (rpe <= 0.2)
    return `bg-green-50 hover:bg-green-100 ${border ? `border-green-200` : ''}`;
  if (rpe <= 0.4)
    return `bg-lime-50 hover:bg-lime-100 ${border ? `border-lime-200` : ''}`;
  if (rpe <= 0.6)
    return `bg-yellow-50 hover:bg-yellow-100 ${border ? `border-yellow-200` : ''}`;
  if (rpe <= 0.8)
    return `bg-orange-50 hover:bg-orange-100 ${border ? `border-orange-200` : ''}`;
  return `bg-red-50 hover:bg-red-100 ${border ? `border-red-200` : ''}`;
};

export const getSportColor = (sport: SPORT_TYPE) => {
  switch (sport) {
    case SPORT_TYPE.RUNNING:
      return 'bg-green-50 hover:bg-green-100 border-green-200';
    case SPORT_TYPE.TRAIL_RUNNING:
      return 'bg-red-50 hover:bg-red-100 border-red-200';
    case SPORT_TYPE.CYCLING:
      return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200';
    case SPORT_TYPE.SWIMMING:
      return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
    case SPORT_TYPE.HIKING:
      return 'bg-amber-50 hover:bg-amber-100 border-amber-200';
    case SPORT_TYPE.ROCK_CLIMBING:
      return 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200';
    default:
  }
};

export const getEventTypeColor = (type: EVENT_TYPE) => {
  switch (type) {
    case 'ACTIVITY':
      return 'bg-green-50 hover:bg-green-100 border-green-200';
    case 'COMPETITION':
      return 'bg-red-50 hover:bg-red-100 border-red-200';
    case 'NOTE':
      return 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200';
    case 'TRAINING':
      return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
  }
};
