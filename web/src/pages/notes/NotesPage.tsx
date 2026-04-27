import { useParams } from 'react-router-dom';
import { useCityNotes } from '../../hooks/useCityNotes';
import { Box, Card, Center, Group, ScrollArea, Stack, Title } from '@mantine/core';
import { useStatsStore } from '../../stores/useStatsStore';
import { useMemo } from 'react';
import { LoadingComponent } from '../../components/ui/LoadingComponent';
import { CreateNoteModal } from './components/CreateNoteModal';
import { NoteComponent } from './components/NoteComponent';
import type { Note } from '../../types/note';

export function NotesPage() {
  const { id } = useParams();
  const { data, isLoading } = useCityNotes(id);

  const { cities } = useStatsStore();
  const cityData = useMemo(() => cities?.find((c) => c.id === id), [cities, id]);

  if (!id) {
    return (
      <Center>
        <Title order={2}>Nie można znaleźć miasta</Title>
      </Center>
    );
  }

  return (
    <Box p="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
        <Group justify="space-between">
          <Title>
            Notatki dla {cityData?.city} ({data?.data?.length ?? 0})
          </Title>

          <CreateNoteModal cityId={id} />
        </Group>
      </Card>

      {isLoading && (
        <Center>
          <LoadingComponent />
        </Center>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <Center mt="md">
          <Title order={3}>Brak notatek dla tego miasta</Title>
        </Center>
      )}

      <ScrollArea h="80vh">
        <Stack mt="md">
          {!isLoading &&
            data?.data?.length > 0 &&
            data.data.map((note: Note) => <NoteComponent key={note.id} note={note} />)}
        </Stack>
      </ScrollArea>
    </Box>
  );
}
