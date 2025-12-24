'use client';

import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
    return (
        <Container size="md" py="xl">
            <Stack gap="lg" align="center">
                <Title order={1}>Welcome to Exam Solution Client</Title>
                <Text size="lg" c="dimmed">
                    Admin Panel for managing exam solutions
                </Text>
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                    <Button size="md">
                        Go to Admin Panel
                    </Button>
                </Link>
            </Stack>
        </Container>
    );
}
