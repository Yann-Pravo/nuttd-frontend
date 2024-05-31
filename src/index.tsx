import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <Toaster toastOptions={{ duration: 3000 }} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
