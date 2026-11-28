import Link from 'next/link';

import { FEATURE_LIST, SERVICE_DESCRIPTION, SERVICE_NAME } from '@/shared/lib/features';
import { PageHeader } from '@/shared/ui/PageHeader';

export default function HomePage() {
  return (
    <>
      <PageHeader title={SERVICE_NAME} description={SERVICE_DESCRIPTION} />
      <ul className="grid gap-4 md:grid-cols-2">
        {FEATURE_LIST.map((feature) => (
          <li key={feature.path}>
            <Link
              href={feature.path}
              className="flex h-full flex-col gap-1 rounded-lg border border-neutral-200 p-4 hover:border-neutral-400"
            >
              <span className="font-semibold">{feature.title}</span>
              <span className="text-sm text-neutral-600">{feature.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
