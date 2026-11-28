import Link from 'next/link';
import type { ReactNode } from 'react';

import { FEATURE_LIST, SERVICE_NAME } from '@/shared/lib/features';
import { HOME_PATH } from '@/shared/lib/routes';

type AppHeaderProps = {
  menu: ReactNode;
};

export function AppHeader({ menu }: AppHeaderProps) {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href={HOME_PATH} className="shrink-0 text-lg font-bold">
            {SERVICE_NAME}
          </Link>
          {menu}
        </div>
        <nav className="-mx-4 overflow-x-auto px-4">
          <ul className="flex gap-4 text-sm whitespace-nowrap">
            {FEATURE_LIST.map((feature) => (
              <li key={feature.path}>
                <Link href={feature.path} className="hover:underline">
                  {feature.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
