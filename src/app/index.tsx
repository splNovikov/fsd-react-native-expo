import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux';
import { Routing } from './routes';
// import { store } from './store';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routing />
  </QueryClientProvider>
);

export default App;
