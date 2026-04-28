import { waitFor } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useCityNotes } from '../useCityNotes';
import { notesApi } from '../../api/notes.api';
import { vi } from 'vitest';

vi.mock('../../api/notes.api', () => ({
  notesApi: {
    getCityNotes: vi.fn(),
  },
}));

test('fetches notes', async () => {
  (notesApi.getCityNotes as any).mockResolvedValue({
    data: [{ id: 1 }],
  });

  let result: any;

  const Hook = () => {
    result = useCityNotes('city-1');
    return null;
  };

  renderWithQuery(<Hook />);

  await waitFor(() => {
    expect(result.isSuccess).toBe(true);
  });
});