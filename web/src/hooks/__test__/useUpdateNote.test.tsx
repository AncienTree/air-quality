import { act } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { useUpdateNote } from '../useUpdateNote';
import { notesApi } from '../../api/notes.api';
import { vi } from 'vitest';

vi.mock('../../api/notes.api', () => ({
  notesApi: {
    updateCityNote: vi.fn(),
  },
}));

test('updates note', async () => {
  (notesApi.updateCityNote as any).mockResolvedValue({});

  let result: any;

  const Hook = () => {
    result = useUpdateNote('city-1');
    return null;
  };

  renderWithQuery(<Hook />);

  await act(async () => {
    await result.mutateAsync({ noteId: 1, data: { title: 'Updated' } });
  });

  expect(notesApi.updateCityNote).toHaveBeenCalledWith(1, { title: 'Updated' });
});