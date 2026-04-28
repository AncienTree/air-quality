import { waitFor } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useCities } from '../useCities';
import { citiesApi } from '../../api/cities.api';
import { vi } from 'vitest';

vi.mock('../../api/cities.api', () => ({
  citiesApi: {
    getAllCities: vi.fn(),
  },
}));

test('fetches cities', async () => {
  (citiesApi.getAllCities as any).mockResolvedValue({
    data: [{ id: '1', name: 'Katowice' }],
  });

  let result: any;

  const Hook = () => {
    result = useCities();
    return null;
  };

  renderWithQuery(<Hook />);

  await waitFor(() => {
    expect(result.isSuccess).toBe(true);
  });

  expect(result.data).toEqual([{ id: '1', name: 'Katowice' }]);
});
