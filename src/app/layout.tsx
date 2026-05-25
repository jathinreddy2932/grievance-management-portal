import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import Layout from '@/components/Layout';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Public Care Portal | Grievance & Feedback Management',
  description: 'A simple, clean, and secure platform to submit and track your public grievances, complaints, suggestions, and feedback.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // Critical for notched displays and safe area support
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          <ThemeRegistry>
            <Layout>{children}</Layout>
          </ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
