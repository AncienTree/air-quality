import { waitFor } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useCityStats } from '../useCityStats';
import { citiesApi } from '../../api/cities.api';
import { vi } from 'vitest';

vi.mock('../../api/cities.api', () => ({
  citiesApi: {
    getCityStats: vi.fn(),
  },
}));

test('fetches single city stats', async () => {
  (citiesApi.getCityStats as any).mockResolvedValue({
    data: { pm10: 33 },
  });

  let result: any;

  const Hook = () => {
    result = useCityStats('city-1');
    return null;
  };

  renderWithQuery(<Hook />);

  await waitFor(() => {
    expect(result.isSuccess).toBe(true);
  });

  expect(result.data).toEqual({ pm10: 33 });
});