import type { Metadata } from 'next';

import { FEATURES } from '@/shared/lib/features';
import { PageHeader } from '@/shared/ui/PageHeader';

const FEATURE = FEATURES.checklist;

export const metadata: Metadata = {
  title: FEATURE.title,
};

export default function ChecklistPage() {
  return <PageHeader title={FEATURE.title} description={FEATURE.description} />;
}
