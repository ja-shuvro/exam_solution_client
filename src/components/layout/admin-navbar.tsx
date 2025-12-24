'use client';

import { NavLink, Stack, Text, Divider } from '@mantine/core';
import {
  IconSchool,
  IconBook,
  IconFileText,
  IconClipboardList,
  IconHistory,
  IconSettings,
  IconBook2,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Classes', href: '/admin/classes', icon: IconSchool },
  { label: 'Subjects', href: '/admin/subjects', icon: IconBook },
  { label: 'Chapters', href: '/admin/chapters', icon: IconBook2 },
  { label: 'Questions', href: '/admin/questions', icon: IconFileText },
  { label: 'Question Sets', href: '/admin/question-sets', icon: IconClipboardList },
  { label: 'Exam Histories', href: '/admin/exam-histories', icon: IconHistory },
  { label: 'Settings', href: '/admin/settings', icon: IconSettings },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Stack gap={4} p="lg" style={{ height: '100%' }}>
      <Text size="xs" fw={700} tt="uppercase" c="dimmed" px="xs" mb="xs">
        Navigation
      </Text>
      <Divider mb="xs" />
      <Stack gap={2}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);

          return (
            <NavLink
              key={item.href}
              label={item.label}
              leftSection={<Icon size={20} stroke={1.5} />}
              active={isActive}
              onClick={() => router.push(item.href)}
              className={isActive ? 'nav-link-active' : 'nav-link-inactive'}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              styles={{
                root: {
                  '&:hover': {
                    transform: 'translateX(4px)',
                  },
                },
                label: {
                  fontSize: 'var(--mantine-font-size-sm)',
                },
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

