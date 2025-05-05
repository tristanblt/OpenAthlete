import { ConnectorProvider } from '@openathlete/shared';

export const getConnectorProviderActivityLink = (
  connectorProvider: ConnectorProvider,
  externalId: string,
): string | undefined => {
  switch (connectorProvider) {
    case 'STRAVA':
      return 'https://www.strava.com/activities/' + externalId;
    case 'FITBIT':
      return 'https://www.fitbit.com/activities/' + externalId;
    case 'GARMIN':
      return 'https://connect.garmin.com/modern/activity/' + externalId;
    case 'APPLE_HEALTH':
      return 'https://www.apple.com/healthcare/health-records/';
  }
  return undefined;
};
