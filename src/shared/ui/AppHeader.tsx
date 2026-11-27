import Link from 'next/link';

import { FEATURE_LIST, SERVICE_NAME } from '@/shared/lib/features';

export function AppHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-bold">
          {SERVICE_NAME}
        </Link>
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
