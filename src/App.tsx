import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContextProvider';
import ErrorPage from './pages/status/errorPage';
import Router from './router';

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPage error={error} resetError={resetErrorBoundary} />
      )}
      onError={(error, info) => {
        console.error('Caught an error:', error, info);
      }}
    >
      <ToastProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
