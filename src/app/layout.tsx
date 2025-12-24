import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactQueryProvider } from '@/lib/react-query';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Exam Solution Client - Admin Panel',
    description: 'Admin panel for exam solution management system',
};

const theme = createTheme({
    primaryColor: 'blue',
    defaultRadius: 'md',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    headings: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: '700',
    },
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
        md: '0 4px 12px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
        xl: '0 16px 48px rgba(0, 0, 0, 0.15)',
    },
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body suppressHydrationWarning>
                <ReactQueryProvider>
                    <MantineProvider theme={theme}>
                        <Notifications position="top-right" />
                        {children}
                    </MantineProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}

