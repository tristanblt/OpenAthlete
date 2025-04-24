import { EVENT_TYPE, SPORT_TYPE } from '@openathlete/shared';

export const getRpeColor = (
  rpe: number,
  intensities: {
    bg: number;
    hover: number;
    border: number;
  } = {
    bg: 500,
    hover: 600,
    border: 700,
  },
  border: boolean = true,
) => {
  if (rpe <= 0.2)
    return `bg-green-${intensities.bg} hover:bg-green-${intensities.hover} ${border ? `border-green-${intensities.border}` : ''}`;
  if (rpe <= 0.4)
    return `bg-lime-${intensities.bg} hover:bg-lime-${intensities.hover} ${border ? `border-lime-${intensities.border}` : ''}`;
  if (rpe <= 0.6)
    return `bg-yellow-${intensities.bg} hover:bg-yellow-${intensities.hover} ${border ? `border-yellow-${intensities.border}` : ''}`;
  if (rpe <= 0.8)
    return `bg-orange-${intensities.bg} hover:bg-orange-${intensities.hover} ${border ? `border-orange-${intensities.border}` : ''}`;
  return `bg-red-${intensities.bg} hover:bg-red-${intensities.hover} ${border ? `border-red-${intensities.border}` : ''}`;
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
