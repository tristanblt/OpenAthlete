import { StravaIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useGetOAuthUriMutation } from '@/services/connector';

export function SettingsView() {
  const getStravaUriMutation = useGetOAuthUriMutation({
    onSuccess: (uri) => {
      window.open(uri, '_self')?.focus();
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-4 text-sm text-gray-500">This is the settings page</p>
      <Button
        onClick={() => getStravaUriMutation.mutate('STRAVA')}
        className="mt-4"
        variant="outline"
      >
        <StravaIcon />
        Connect with Strava
      </Button>
    </div>
  );
}
