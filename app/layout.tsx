import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'ICDI Startup Project Tracking System',
  description: 'A centralized system for managing, storing, and tracking the progress of startup projects for Digital Innovation students.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
