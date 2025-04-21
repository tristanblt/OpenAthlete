export const getRpeColor = (rpe: number) => {
  if (rpe <= 0.2) return 'bg-green-500 hover:bg-green-600';
  if (rpe <= 0.4) return 'bg-lime-500 hover:bg-lime-600';
  if (rpe <= 0.6) return 'bg-yellow-500 hover:bg-yellow-600';
  if (rpe <= 0.8) return 'bg-orange-500 hover:bg-orange-600';
  return 'bg-red-500 hover:bg-red-600';
};
