import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from 'api';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <Toaster toastOptions={{ duration: 3000 }} />
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </QueryClientProvider>,
);
