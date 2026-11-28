import type { Metadata } from 'next';
import { Suspense } from 'react';

import { SellerHeaderMenu } from '@/features/seller/components/SellerHeaderMenu';
import { QueryProvider } from '@/shared/api/QueryProvider';
import { SERVICE_DESCRIPTION, SERVICE_NAME } from '@/shared/lib/features';
import { AppHeader } from '@/shared/ui/AppHeader';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <AppHeader
            menu={
              <Suspense fallback={<SellerHeaderMenuSkeleton />}>
                <SellerHeaderMenu />
              </Suspense>
            }
          />
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

function SellerHeaderMenuSkeleton() {
  return <div aria-hidden className="h-5 w-16 animate-pulse rounded bg-neutral-200" />;
}
