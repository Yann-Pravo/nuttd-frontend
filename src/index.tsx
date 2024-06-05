import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from 'api';
// import { RouterProvider, createRouter } from '@tanstack/react-router';

// // Import the generated route tree
// import { routeTree } from './routeTree.gen';
// import { AuthProvider, useAuth } from 'contexts/auth';
import App from 'App';

// function InnerApp() {
//   const auth = useAuth();
//   return <RouterProvider router={router} context={{ auth }} />;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <InnerApp />
//     </AuthProvider>
//   );
// }

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <Toaster toastOptions={{ duration: 3000 }} />
    <App />
  </QueryClientProvider>,
);
