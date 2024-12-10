import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/status/errorPage';
import Router from './router';
import { ToastProvider } from './context/ToastContextProvider';

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPage error={error} resetError={resetErrorBoundary} />
      )}
      onError={() => {}}
    >
      <ToastProvider>
        <Router />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
