'use client';

import { Box, Group, Title, Button, Text } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';

export function AdminHeader() {
  return (
    <Box
      h={70}
      px="xl"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Group h="100%" justify="space-between" style={{ width: '100%' }}>
        <Group gap="md">
          <Title
            order={3}
            style={{
              color: 'white',
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            Admin Panel
          </Title>
          <Text size="sm" c="white" opacity={0.9}>
            Exam Solution Management
          </Text>
        </Group>
        <Group gap="sm">
          <Button
            variant="white"
            color="gray"
            leftSection={<IconUser size={16} />}
            size="sm"
            radius="md"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            Profile
          </Button>
          <Button
            variant="white"
            color="red"
            leftSection={<IconLogout size={16} />}
            size="sm"
            radius="md"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            Logout
          </Button>
        </Group>
      </Group>
    </Box>
  );
}

