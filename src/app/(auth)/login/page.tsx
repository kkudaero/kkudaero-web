import type { Metadata } from 'next';

import { loginSeller } from '@/features/seller/api/sellerActions';
import { SellerAuthForm } from '@/features/seller/components/SellerAuthForm';
import { SIGNUP_PATH } from '@/shared/lib/routes';

const TITLE = '로그인';

export const metadata: Metadata = {
  title: TITLE,
};

export default function LoginPage() {
  return (
    <SellerAuthForm
      action={loginSeller}
      title={TITLE}
      description="가입한 이메일과 비밀번호로 로그인해요"
      submitLabel="이메일로 로그인"
      isNewPassword={false}
      switchPrompt="아직 계정이 없나요?"
      switchLabel="가입하기"
      switchPath={SIGNUP_PATH}
    />
  );
}
