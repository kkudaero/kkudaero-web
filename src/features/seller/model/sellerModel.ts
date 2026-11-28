import type { components } from '@/shared/api/schema';

type SellerResponse = components['schemas']['SellerResponse'];
type LoginResponse = components['schemas']['LoginResponse'];

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;
export const PASSWORD_PATTERN = '[\\x21-\\x7E]*';
export const PASSWORD_HINT = `공백 없이 영문, 숫자, 특수문자 ${PASSWORD_MIN_LENGTH}~${PASSWORD_MAX_LENGTH}자`;

const DEFAULT_ERROR_MESSAGE = '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.';
const ERROR_MESSAGES: Record<string, string> = {
  SELLER_EMAIL_DUPLICATED: '이미 가입한 이메일이에요.',
  SELLER_LOGIN_FAILED: '이메일 또는 비밀번호가 올바르지 않아요.',
  INVALID_REQUEST: '입력한 내용을 다시 확인해 주세요.',
};

export type SellerModel = {
  email: string;
};

export type SellerSessionModel = {
  accessToken: string;
  expiresAt: Date;
};

export type SellerFormStateModel = {
  email: string;
  errorMessage: string | null;
};

export const INITIAL_SELLER_FORM_STATE: SellerFormStateModel = {
  email: '',
  errorMessage: null,
};

export function toSellerModel(response: SellerResponse | undefined): SellerModel {
  if (!response?.email) {
    throw new Error('셀러 응답에 이메일이 없습니다.');
  }

  return { email: response.email };
}

export function toSellerSessionModel(response: LoginResponse | undefined): SellerSessionModel {
  if (!response?.accessToken || !response.expiresAt) {
    throw new Error('로그인 응답에 토큰 또는 만료 시각이 없습니다.');
  }

  return {
    accessToken: response.accessToken,
    expiresAt: new Date(response.expiresAt),
  };
}

export function toSellerFormStateModel(
  email: string,
  errorCode: string | null,
): SellerFormStateModel {
  return {
    email,
    errorMessage: (errorCode && ERROR_MESSAGES[errorCode]) || DEFAULT_ERROR_MESSAGE,
  };
}
