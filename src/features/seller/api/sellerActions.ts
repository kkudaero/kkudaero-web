'use server';

import { redirect } from 'next/navigation';

import { ApiError } from '@/shared/api/apiError';
import { deleteAccessToken, saveAccessToken } from '@/shared/api/session';
import { HOME_PATH, LOGIN_PATH } from '@/shared/lib/routes';

import { toSellerFormStateModel, toSellerSessionModel } from '../model/sellerModel';
import type { SellerFormStateModel } from '../model/sellerModel';
import { createSeller, postSellerLogin } from './sellerApi';

const EMAIL_FIELD_NAME = 'email';
const PASSWORD_FIELD_NAME = 'password';

export async function loginSeller(
  _previousState: SellerFormStateModel,
  formData: FormData,
): Promise<SellerFormStateModel> {
  try {
    await startSellerSession(formData);
  } catch (error) {
    return toFailedFormState(formData, error);
  }

  redirect(HOME_PATH);
}

export async function signUpSeller(
  _previousState: SellerFormStateModel,
  formData: FormData,
): Promise<SellerFormStateModel> {
  try {
    await createSeller(readCredentials(formData));
    await startSellerSession(formData);
  } catch (error) {
    return toFailedFormState(formData, error);
  }

  redirect(HOME_PATH);
}

export async function logoutSeller() {
  await deleteAccessToken();

  redirect(LOGIN_PATH);
}

async function startSellerSession(formData: FormData) {
  const session = toSellerSessionModel(await postSellerLogin(readCredentials(formData)));

  await saveAccessToken(session.accessToken, session.expiresAt);
}

function readCredentials(formData: FormData) {
  return {
    email: readText(formData, EMAIL_FIELD_NAME),
    password: readText(formData, PASSWORD_FIELD_NAME),
  };
}

function readText(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  return typeof value === 'string' ? value : '';
}

function toFailedFormState(formData: FormData, error: unknown) {
  return toSellerFormStateModel(
    readText(formData, EMAIL_FIELD_NAME),
    error instanceof ApiError ? error.code : null,
  );
}
