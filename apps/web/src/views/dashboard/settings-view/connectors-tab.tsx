import { StravaIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useGetOAuthUriMutation } from '@/services/connector';

interface P {}

export function ConnectorsTab({}: P) {
  const getStravaUriMutation = useGetOAuthUriMutation({
    onSuccess: (uri) => {
      window.open(uri, '_self')?.focus();
    },
  });

  return (
    <div>
      <Button
        onClick={() => getStravaUriMutation.mutate('STRAVA')}
        className="mt-4"
        variant="outline"
        isLoading={getStravaUriMutation.isPending}
      >
        <StravaIcon />
        Connect with Strava
      </Button>
    </div>
  );
}
