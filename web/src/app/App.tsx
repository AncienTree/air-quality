import { ErrorBoundary } from './ErrorBoundary';
import { Providers } from './providers';
import { AppRouter } from './router';
import '@mantine/core/styles.css';

function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
