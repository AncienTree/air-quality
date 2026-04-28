import { screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { renderWithProviders } from '../test-utils';

describe('HomePage', () => {
  it('renders the main headline and feature list', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { name: /Panel jakości powietrza/i })).toBeInTheDocument();
    expect(screen.getByText(/Demo Project/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
