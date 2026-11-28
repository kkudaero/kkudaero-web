import type { Metadata } from 'next';
import Link from 'next/link';

import { loginSeller } from '@/features/seller/api/sellerActions';
import { SellerAuthForm } from '@/features/seller/components/SellerAuthForm';
import { SIGNUP_PATH } from '@/shared/lib/routes';
import { PageHeader } from '@/shared/ui/PageHeader';

const TITLE = '로그인';

export const metadata: Metadata = {
  title: TITLE,
};

export default function LoginPage() {
  return (
    <>
      <PageHeader title={TITLE} description="가입한 이메일과 비밀번호로 로그인해요." />
      <SellerAuthForm action={loginSeller} submitLabel={TITLE} isNewPassword={false} />
      <p className="text-sm text-neutral-600">
        아직 계정이 없나요?{' '}
        <Link href={SIGNUP_PATH} className="font-semibold text-neutral-900 hover:underline">
          가입하기
        </Link>
      </p>
    </>
  );
}
