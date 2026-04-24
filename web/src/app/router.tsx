import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>TODO</>,
    children: [],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
