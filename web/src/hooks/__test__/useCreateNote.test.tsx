import { act } from '@testing-library/react';
import { renderWithQuery } from './test-query-wrapper';
import { notesApi } from '../../api/notes.api';
import { vi } from 'vitest';
import { useCreateNote } from '../useCreateNote';

vi.mock('../../api/notes.api', () => ({
  notesApi: {
    createCityNote: vi.fn(),
  },
}));

test('creates note', async () => {
  (notesApi.createCityNote as any).mockResolvedValue({ data: {} });

  let result: any;

  const Hook = () => {
    result = useCreateNote('city-1');
    return null;
  };

  renderWithQuery(<Hook />);

  await act(async () => {
    await result.mutateAsync({ title: 'Test' });
  });

  expect(notesApi.createCityNote).toHaveBeenCalled();
});