import { Button, Modal, Text, Title } from '@mantine/core';
import type { Note } from '../../../types/note';
import { useDisclosure } from '@mantine/hooks';

type NoteModalProps = {
  note: Note;
};
export function NoteModal({ note }: NoteModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Szczegóły notatki">
        <Title order={2} mb="md">
          {note.title}
        </Title>
        <Text>{note.content}</Text>
      </Modal>

      <Button variant="outline" onClick={open}>
        Szczegóły
      </Button>
    </>
  );
}
