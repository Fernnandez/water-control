import { QueryClient, QueryClientProvider } from 'react-query';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Navigation } from './components/Navigation/Navigation';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation>
        <Dashboard />
      </Navigation>
    </QueryClientProvider>
  );
}

export default App;
