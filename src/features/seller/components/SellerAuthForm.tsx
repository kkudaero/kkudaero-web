'use client';

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
  submitLabel: string;
  isNewPassword: boolean;
};

const INPUT_CLASS_NAME =
  'rounded-lg border border-neutral-300 px-3 py-2 text-base focus:border-neutral-900 focus:outline-none';

export function SellerAuthForm({ action, submitLabel, isNewPassword }: SellerAuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_SELLER_FORM_STATE);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        이메일
        <input
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={state.email}
          required
          className={INPUT_CLASS_NAME}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
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
        {isNewPassword && <span className="font-normal text-neutral-600">{PASSWORD_HINT}</span>}
      </label>
      {state.errorMessage && <ErrorMessage message={state.errorMessage} />}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        {submitLabel}
      </button>
    </form>
  );
}
