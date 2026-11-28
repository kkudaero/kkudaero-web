'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { ErrorMessage } from '@/shared/ui/ErrorMessage';

import {
  INITIAL_SELLER_FORM_STATE,
  PASSWORD_HINT,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERN,
} from '../model/sellerModel';
import type { SellerFormStateModel } from '../model/sellerModel';

type SellerAuthFormProps = {
  action: (
    previousState: SellerFormStateModel,
    formData: FormData,
  ) => Promise<SellerFormStateModel>;
  title: string;
  description: string;
  submitLabel: string;
  isNewPassword: boolean;
  switchPrompt: string;
  switchLabel: string;
  switchPath: string;
};

const EMAIL_PLACEHOLDER = 'seller@example.com';
const LABEL_CLASS_NAME = 'text-content-secondary flex flex-col gap-1.5 text-[13px]';
const INPUT_CLASS_NAME =
  'border-line text-content-primary placeholder:text-content-tertiary focus:border-brand rounded-[10px] border px-3.5 py-[13px] text-[15px] focus:outline-none';

export function SellerAuthForm({
  action,
  title,
  description,
  submitLabel,
  isNewPassword,
  switchPrompt,
  switchLabel,
  switchPath,
}: SellerAuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_SELLER_FORM_STATE);

  return (
    <>
      <div className="hidden flex-col gap-2 lg:flex">
        <h1 className="text-[30px] leading-[1.3]">{title}</h1>
        <p className="text-[15px] text-content-secondary">{description}</p>
      </div>
      <form action={formAction} className="flex flex-col gap-2.5">
        <h1 className="sr-only lg:hidden">{title}</h1>
        <label className={LABEL_CLASS_NAME}>
          이메일
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={state.email}
            placeholder={EMAIL_PLACEHOLDER}
            required
            className={INPUT_CLASS_NAME}
          />
        </label>
        <label className={LABEL_CLASS_NAME}>
          비밀번호
          <input
            type="password"
            name="password"
            autoComplete={isNewPassword ? 'new-password' : 'current-password'}
            required
            minLength={isNewPassword ? PASSWORD_MIN_LENGTH : undefined}
            maxLength={isNewPassword ? PASSWORD_MAX_LENGTH : undefined}
            pattern={isNewPassword ? PASSWORD_PATTERN : undefined}
            title={isNewPassword ? PASSWORD_HINT : undefined}
            className={INPUT_CLASS_NAME}
          />
          {isNewPassword && <span className="text-content-tertiary">{PASSWORD_HINT}</span>}
        </label>
        {state.errorMessage && <ErrorMessage message={state.errorMessage} />}
        <button
          type="submit"
          disabled={isPending}
          className="rounded-[10px] bg-brand px-4 py-[13px] text-[15px] font-bold text-on-brand disabled:opacity-50 lg:rounded-xl lg:font-normal"
        >
          {submitLabel}
        </button>
      </form>
      <p className="text-center text-xs text-content-tertiary">
        {switchPrompt}{' '}
        <Link href={switchPath} className="text-content-secondary underline">
          {switchLabel}
        </Link>
      </p>
    </>
  );
}
