import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useDeleteNote } from '../../../hooks/useDeleteNote';

type DeleteModalNoteProps = {
  noteId: number;
  cityId: string;
};

export function DeleteModalNote({ noteId, cityId }: DeleteModalNoteProps) {
  const { mutate } = useDeleteNote(cityId);

  function openConfirm() {
    modals.openConfirmModal({
      title: 'Potwierdzenie',
      children: 'Czy na pewno chcesz usunąć notatkę?',
      labels: { confirm: 'Usuń', cancel: 'Anuluj' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        mutate(noteId);
      },
    });
  }

  return (
    <Button variant="outline" color="red" onClick={openConfirm}>
      Usuń
    </Button>
  );
}
