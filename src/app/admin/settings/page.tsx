import { Container, Title, Stack, Text, Card } from '@mantine/core';

export default function SettingsPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={2} fw={800} style={{ letterSpacing: '-0.5px' }}>
            Settings
          </Title>
          <Text c="dimmed" mt="xs" size="sm">
            Configure your application settings
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Text c="dimmed" ta="center" py="xl" size="lg">
            Settings page coming soon...
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}

