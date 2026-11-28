import 'server-only';

import { toApiError } from '@/shared/api/apiError';
import type { components } from '@/shared/api/schema';
import { createServerApiClient } from '@/shared/api/serverApiClient';

type SignUpRequest = components['schemas']['SignUpRequest'];
type LoginRequest = components['schemas']['LoginRequest'];

export async function createSeller(request: SignUpRequest) {
  const serverApiClient = await createServerApiClient();
  const { data, error, response } = await serverApiClient.POST('/api/v1/sellers', {
    body: request,
  });

  if (!data) {
    throw toApiError(response.status, error);
  }

  return data.data;
}

export async function postSellerLogin(request: LoginRequest) {
  const serverApiClient = await createServerApiClient();
  const { data, error, response } = await serverApiClient.POST('/api/v1/sellers/login', {
    body: request,
  });

  if (!data) {
    throw toApiError(response.status, error);
  }

  return data.data;
}

export async function fetchSellerMe() {
  const serverApiClient = await createServerApiClient();
  const { data, error, response } = await serverApiClient.GET('/api/v1/sellers/me');

  if (!data) {
    throw toApiError(response.status, error);
  }

  return data.data;
}
