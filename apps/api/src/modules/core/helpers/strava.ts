import { sport_type } from '@openathlete/database';

/**
 * Maps Strava sport type to our sport type
 * @param type - Strava sport type (AlpineSki, BackcountrySki, Badminton, Canoeing, Crossfit, EBikeRide, Elliptical, EMountainBikeRide, Golf, GravelRide, Handcycle, HighIntensityIntervalTraining, Hike, IceSkate, InlineSkate, Kayaking, Kitesurf, MountainBikeRide, NordicSki, Pickleball, Pilates, Racquetball, Ride, RockClimbing, RollerSki, Rowing, Run, Sail, Skateboard, Snowboard, Snowshoe, Soccer, Squash, StairStepper, StandUpPaddling, Surfing, Swim, TableTennis, Tennis, TrailRun, Velomobile, VirtualRide, VirtualRow, VirtualRun, Walk, WeightTraining, Wheelchair, Windsurf, Workout, Yoga)
 * @returns sport type
 */
export const mapStravaSportType = (type: string): sport_type => {
  switch (type) {
    case 'Ride':
      return sport_type.CYCLING;
    case 'Run':
      return sport_type.RUNNING;
    case 'Swim':
      return sport_type.SWIMMING;
    case 'Hike':
      return sport_type.HIKING;
    case 'TrailRun':
      return sport_type.TRAIL_RUNNING;
    case 'RockClimbing':
      return sport_type.ROCK_CLIMBING;
    default:
      return sport_type.OTHER;
  }
};
