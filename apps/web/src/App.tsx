import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { AuthConsumer, AuthProvider } from './contexts/auth';
import router from './routes/sections';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AuthConsumer>
          <RouterProvider router={router} />
        </AuthConsumer>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
