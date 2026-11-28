import type { Metadata } from 'next';
import Link from 'next/link';

import { signUpSeller } from '@/features/seller/api/sellerActions';
import { SellerAuthForm } from '@/features/seller/components/SellerAuthForm';
import { LOGIN_PATH } from '@/shared/lib/routes';
import { PageHeader } from '@/shared/ui/PageHeader';

const TITLE = '가입';

export const metadata: Metadata = {
  title: TITLE,
};

export default function SignupPage() {
  return (
    <>
      <PageHeader title={TITLE} description="이메일과 비밀번호만으로 시작할 수 있어요." />
      <SellerAuthForm action={signUpSeller} submitLabel="가입하기" isNewPassword />
      <p className="text-sm text-neutral-600">
        이미 계정이 있나요?{' '}
        <Link href={LOGIN_PATH} className="font-semibold text-neutral-900 hover:underline">
          로그인
        </Link>
      </p>
    </>
  );
}
