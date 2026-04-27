import type { Note } from '../../../types/note';
import { Card, Group, Text, Title } from '@mantine/core';
import { format } from 'date-fns';
import { DeleteModalNote } from './DeleteModalNote';
import { NoteModal } from './NoteModal';
import { CreateNoteModal } from './CreateNoteModal';

type NoteComponentProps = {
  note: Note;
};

export function NoteComponent({ note }: NoteComponentProps) {
  const createdDate = format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm');
  const editedDate =
    note.updatedAt && note.updatedAt !== note.createdAt
      ? format(new Date(note.updatedAt), 'yyyy-MM-dd HH:mm')
      : null;

  return (
    <>
      <Card padding="lg" radius="md" withBorder shadow='sm'>
        <Group justify="space-between" mb="md">
          <Title order={4}>{note.title}</Title>
          <Group gap="xs">
            <Text size="sm" color="dimmed" fw={500}>
              Dodano: {createdDate}
            </Text>
            {editedDate && (
              <Text size="sm" color="dimmed" fw={500}>
                Edytowano: {editedDate}
              </Text>
            )}
          </Group>
        </Group>
        <Group>
          <CreateNoteModal note={note} isEdit cityId={note?.cityId} />
          <NoteModal note={note} />
          <DeleteModalNote noteId={note.id} cityId={note?.cityId} />
        </Group>
      </Card>
    </>
  );
}
