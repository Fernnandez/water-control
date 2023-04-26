import { Title } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Navigation } from './components/Navigation/Navigation';
import { AppProvider } from './contexts/AppContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Navigation>
            <Routes>
              <Route
                path="/"
                element={<Title>Selecione um dispositivo</Title>}
              />
              <Route path="things/:id" element={<Dashboard />} />
            </Routes>
          </Navigation>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
