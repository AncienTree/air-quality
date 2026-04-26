import { Box, Burger, Container, Divider, Drawer, Group, ScrollArea, Text } from '@mantine/core';
import { WindIcon } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import classes from './AppHeader.module.css';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';

const links = [
  { link: '/', label: 'Strona główna' },
  { link: '/measurements', label: 'Pomiary' },
];

export function AppHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  const items = links.map((link) => {
    const isActive = location.pathname === link.link;
    return (
      <Link
        key={link.label}
        to={link.link}
        className={clsx(classes.link, isActive && classes.active)}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Box className={classes.divRow}>
          <WindIcon size={28} />
          <Text size="xl" fw={600} ml="xs">
            Air Quality Simple App
          </Text>
        </Box>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {items}
        </ScrollArea>
      </Drawer>
    </header>
  );
}
