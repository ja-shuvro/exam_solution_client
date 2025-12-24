'use client';

import { AppShell } from '@mantine/core';
import { AdminNavbar, AdminHeader } from '@/components/layout';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
      }}
      header={{
        height: 70,
      }}
      padding="xl"
      styles={{
        main: {
          backgroundColor: 'var(--mantine-color-gray-0)',
          minHeight: '100vh',
        },
        navbar: {
          backgroundColor: 'white',
          borderRight: '1px solid var(--mantine-color-gray-2)',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <AppShell.Header>
        <AdminHeader />
      </AppShell.Header>
      <AppShell.Navbar>
        <AdminNavbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

