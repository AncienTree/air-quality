import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { MeasurementsPage } from '../pages/measurements/MeasurementsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ErrorPage } from '../pages/ErrorPage';
import { MeasurementDetailsPage } from '../pages/measurements/MeasurementDetailsPage';
import { NotesPage } from '../pages/notes/NotesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'measurements', element: <MeasurementsPage /> },
      { path: 'measurements/:id', element: <MeasurementDetailsPage /> },
      { path: 'notes/:id', element: <NotesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
