import { act } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useDeleteNote } from '../useDeleteNote';
import { notesApi } from '../../api/notes.api';
import { vi } from 'vitest';

vi.mock('../../api/notes.api', () => ({
  notesApi: {
    deleteCityNote: vi.fn(),
  },
}));

test('deletes note', async () => {
  (notesApi.deleteCityNote as any).mockResolvedValue({});

  let result: any;

  const Hook = () => {
    result = useDeleteNote('city-1');
    return null;
  };

  renderWithQuery(<Hook />);

  await act(async () => {
    await result.mutateAsync(1);
  });

  expect(notesApi.deleteCityNote).toHaveBeenCalledWith(1);
});