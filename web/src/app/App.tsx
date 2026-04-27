import { ErrorBoundary } from './ErrorBoundary';
import { Providers } from './providers';
import { AppRouter } from './router';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <Notifications />

        <AppRouter />
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
