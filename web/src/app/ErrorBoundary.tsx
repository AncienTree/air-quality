import { Component, type ReactNode } from 'react';
import { Button, Container, Stack, Text, Title } from '@mantine/core';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" py="xl">
          <Stack align="center">
            <Title order={2}>Coś poszło nie tak</Title>
            <Text c="dimmed">Spróbuj odświeżyć stronę</Text>

            <Button onClick={() => window.location.reload()}>Odśwież</Button>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}
