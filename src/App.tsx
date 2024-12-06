import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContextProvider';
import ErrorPage from './pages/status/errorPage';
import Router from './router';
import { AuthProvider } from './context/AuthContextProvider';

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
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
