import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from './components/ui/sonner';
import { AuthConsumer, AuthProvider } from './contexts/auth';
import { SpaceConsumer, SpaceProvider } from './contexts/space';
import router from './routes/sections';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <SpaceProvider>
        <QueryClientProvider client={queryClient}>
          <AuthConsumer>
            <SpaceConsumer>
              <RouterProvider router={router} />
            </SpaceConsumer>
            <Toaster />
          </AuthConsumer>
        </QueryClientProvider>
      </SpaceProvider>
    </AuthProvider>
  );
}

export default App;
