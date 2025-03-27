import { ActivityEvent } from '../entities';

export const getActivityDuration = (activity: ActivityEvent) => {
  const start = new Date(activity.startDate);
  const end = new Date(activity.endDate);

  const diff = end.getTime() - start.getTime();
  const seconds = diff / 1000;
  return seconds;
};
