import { Suspense } from 'react';

import { SellerHeaderMenu } from '@/features/seller/components/SellerHeaderMenu';
import { AppHeader } from '@/shared/ui/AppHeader';

export default function MainLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
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
    </>
  );
}

function SellerHeaderMenuSkeleton() {
  return <div aria-hidden className="h-5 w-16 animate-pulse rounded bg-neutral-200" />;
}
