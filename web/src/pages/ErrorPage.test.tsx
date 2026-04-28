import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorPage } from './ErrorPage';
import { renderWithProviders } from '../test-utils';

// mock react-router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');

  return {
    ...actual,
    useRouteError: () => 'Test error',
  };
});

describe('ErrorPage', () => {
  it('renders error message and details', () => {
    renderWithProviders(<ErrorPage />);

    expect(
      screen.getByText(/Ups... coś poszło nie tak/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
  });

  it('reload button triggers window reload', () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    renderWithProviders(<ErrorPage />);

    fireEvent.click(
      screen.getByRole('button', { name: /Odśwież/i })
    );

    expect(reloadMock).toHaveBeenCalled();
  });

  it('home button links to "/"', () => {
    renderWithProviders(<ErrorPage />);

    const link = screen.getByRole('link', {
      name: /Strona główna/i,
    });

    expect(link).toHaveAttribute('href', '/');
  });
});