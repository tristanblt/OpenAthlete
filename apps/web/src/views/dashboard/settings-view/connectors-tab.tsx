import { StravaIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
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
      <div className="text-sm font-semibold">
        ICalendar URL (for syncing with other calendars):
      </div>
      <Textarea disabled className="break-all h-13">
        {`${API_BASE_URL}/event/ical?calendar=${icalSecret}`}
      </Textarea>
    </div>
  );
}
