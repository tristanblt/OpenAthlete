import { LoadingScreen } from '@/components/loading-screen';
import { getPath } from '@/routes/paths';
import { useSetOAuthTokenMutation } from '@/services/connector';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ConnectorProvider } from '@openathlete/shared';

export function OAuthCallbackPage() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const setOAuthTokenMutation = useSetOAuthTokenMutation({
    onSuccess: () => {
      toast.success('Connected successfully');
      nav(getPath(['dashboard', 'settings']));
    },
    onError: (error) => {
      toast.error(error.message);
      nav(getPath(['dashboard', 'settings']));
    },
  });

  useEffect(() => {
    const code = searchParams.get('code');
    const finalProvider = (provider || '').toUpperCase();
    const validProviders = ['STRAVA'];
    if (code && provider && validProviders.includes(finalProvider)) {
      setOAuthTokenMutation.mutate({
        provider: finalProvider as ConnectorProvider,
        code,
      });
    } else {
      nav(getPath(['dashboard', 'settings']));
      toast.error('Invalid provider');
    }
  }, [provider, searchParams]);

  return <LoadingScreen message={`Importing data from ${provider}`} />;
}
