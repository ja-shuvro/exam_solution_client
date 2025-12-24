import { Container, Title, Text, Stack, Card, Group, ThemeIcon, SimpleGrid } from '@mantine/core';
import {
  IconSchool,
  IconBook,
  IconFileText,
  IconClipboardList,
  IconHistory,
} from '@tabler/icons-react';
import Link from 'next/link';

const stats = [
  { label: 'Classes', href: '/admin/classes', icon: IconSchool, gradient: { from: 'blue', to: 'cyan' } },
  { label: 'Subjects', href: '/admin/subjects', icon: IconBook, gradient: { from: 'teal', to: 'green' } },
  { label: 'Questions', href: '/admin/questions', icon: IconFileText, gradient: { from: 'orange', to: 'red' } },
  { label: 'Question Sets', href: '/admin/question-sets', icon: IconClipboardList, gradient: { from: 'grape', to: 'pink' } },
  { label: 'Exam Histories', href: '/admin/exam-histories', icon: IconHistory, gradient: { from: 'indigo', to: 'violet' } },
];

export default function AdminDashboard() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} size="h2" fw={800} style={{ letterSpacing: '-0.5px' }}>
            Admin Dashboard
          </Title>
          <Text c="dimmed" mt="xs" size="lg">
            Manage your exam solution system
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
                <Card
                  shadow="md"
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    borderColor: 'var(--mantine-color-gray-2)',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                        borderColor: 'transparent',
                      },
                    },
                  }}
                >
                  <Group gap="lg">
                    <ThemeIcon
                      size={56}
                      radius="md"
                      variant="gradient"
                      gradient={stat.gradient}
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <Icon size={28} stroke={2} />
                    </ThemeIcon>
                    <div>
                      <Text fw={700} size="xl" style={{ letterSpacing: '-0.3px' }}>
                        {stat.label}
                      </Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        Manage {stat.label.toLowerCase()}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Link>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}

