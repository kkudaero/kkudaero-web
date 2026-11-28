import type { Metadata } from 'next';

import { signUpSeller } from '@/features/seller/api/sellerActions';
import { SellerAuthForm } from '@/features/seller/components/SellerAuthForm';
import { LOGIN_PATH } from '@/shared/lib/routes';

const TITLE = '시작하기';

export const metadata: Metadata = {
  title: TITLE,
};

export default function SignupPage() {
  return (
    <SellerAuthForm
      action={signUpSeller}
      title={TITLE}
      description="이메일과 비밀번호만으로 바로 시작할 수 있어요"
      submitLabel="이메일로 시작하기"
      isNewPassword
      switchPrompt="이미 계정이 있나요?"
      switchLabel="로그인"
      switchPath={LOGIN_PATH}
    />
  );
}
