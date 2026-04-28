import { waitFor } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useCitiesStats } from '../useCitiesStats';
import { citiesApi } from '../../api/cities.api';
import { vi } from 'vitest';

vi.mock('../../api/cities.api', () => ({
  citiesApi: {
    getCitiesStats: vi.fn(),
  },
}));

test('fetches stats with range and search', async () => {
  (citiesApi.getCitiesStats as any).mockResolvedValue({
    data: { stats: [] },
  });

  let result: any;

  const Hook = () => {
    result = useCitiesStats('24h', 'Katowice');
    return null;
  };

  renderWithQuery(<Hook />);

  await waitFor(() => {
    expect(result.isSuccess).toBe(true);
  });

  expect(citiesApi.getCitiesStats).toHaveBeenCalledWith('24h', 'Katowice');
});