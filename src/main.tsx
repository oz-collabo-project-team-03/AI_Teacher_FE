import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

// async function enableMocking() {
//   if (!import.meta.env.DEV) {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() => {
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <StrictMode> */}
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    {/* </StrictMode> */}
  </QueryClientProvider>
);
// });
