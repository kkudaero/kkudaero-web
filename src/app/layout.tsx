import type { Metadata } from 'next';

import { QueryProvider } from '@/shared/api/QueryProvider';
import { SERVICE_DESCRIPTION, SERVICE_NAME } from '@/shared/lib/features';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
