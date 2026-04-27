import { Button, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useCrateNote } from '../../../hooks/useCreateNote';
import { useUpdateNote } from '../../../hooks/useUpdateNote';
import type { Note } from '../../../types/note';
import { useEffect } from 'react';

type CreateNoteModalProps = {
  cityId: string;
  note?: Note;
  isEdit?: boolean;
};

export function CreateNoteModal({ cityId, note, isEdit = false }: CreateNoteModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const { isPending: isPendingSave, mutate: create } = useCrateNote(cityId);
  const { isPending: isPendingUpdate, mutate: update } = useUpdateNote(cityId);

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },

    validate: {
      title: (value) => (value.trim().length < 3 ? 'Tytuł musi mieć min. 3 znaki' : null),
      content: (value) => (value.trim().length < 5 ? 'Treść musi mieć min. 5 znaków' : null),
    },
  });

  useEffect(() => {
    if (isEdit && note) {
      form.setValues({
        title: note.title,
        content: note.content,
      });
    }
  }, [isEdit, note]);

  const handleSubmit = (values: typeof form.values) => {
    if (isEdit) {
      if (!note?.id) return;

      update(
        { data: values, noteId: note?.id },
        {
          onSuccess: () => {
            form.reset();
            close();
          },
        },
      );
    } else {
      create(values, {
        onSuccess: () => {
          form.reset();
          close();
        },
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={isEdit ? 'Edytuj notatkę' : 'Utwórz nową notatkę'}
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Tytuł" placeholder="Wpisz tytuł" {...form.getInputProps('title')} />

            <Textarea
              label="Treść"
              placeholder="Wpisz treść notatki"
              minRows={4}
              autosize
              {...form.getInputProps('content')}
            />

            <Button type="submit" loading={isPendingSave || isPendingUpdate}>
              {isEdit ? 'Zapisz zmiany' : 'Utwórz notatkę'}
            </Button>
          </Stack>
        </form>
      </Modal>

      <Button variant="outline" onClick={open}>
        {isEdit ? 'Edytuj' : 'Dodaj notatkę'}
      </Button>
    </>
  );
}
