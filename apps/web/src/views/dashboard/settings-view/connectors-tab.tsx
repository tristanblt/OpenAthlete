import { StravaIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/config';
import { useGetOAuthUriMutation } from '@/services/connector';
import { useGetMyIcalCalendarSecretQuery } from '@/services/event';

interface P {}

export function ConnectorsTab({}: P) {
  const getStravaUriMutation = useGetOAuthUriMutation({
    onSuccess: (uri) => {
      window.open(uri, '_self')?.focus();
    },
  });
  const { data: icalSecret } = useGetMyIcalCalendarSecretQuery();

  return (
    <div className="flex flex-col gap-4 items-start">
      <Button
        onClick={() => getStravaUriMutation.mutate('STRAVA')}
        className="mt-4"
        variant="outline"
        isLoading={getStravaUriMutation.isPending}
      >
        <StravaIcon />
        Connect with Strava
      </Button>
      {icalSecret && (
        <>
          <div className="text-sm font-semibold">
            ICalendar URL (for syncing with other calendars):
          </div>
          <div className="text-sm text-muted-foreground font-mono p-2 border-1 break-all rounded-sm">
            {`${API_BASE_URL}/event/ical?calendar=${icalSecret}`}
          </div>
        </>
      )}
    </div>
  );
}
