import 'server-only';

import { connection } from 'next/server';
import createClient from 'openapi-fetch';
import type { Middleware } from 'openapi-fetch';

import { getApiBaseURL } from './apiBaseURL';
import type { paths } from './schema';
import { getAccessToken } from './session';

export const AUTHORIZATION_HEADER = 'Authorization';

const authorizationMiddleware: Middleware = {
  async onRequest({ request }) {
    const accessToken = await getAccessToken();

    if (accessToken) {
      request.headers.set(AUTHORIZATION_HEADER, toBearerToken(accessToken));
    }

    return request;
  },
};

export async function createServerApiClient() {
  await connection();

  const serverApiClient = createClient<paths>({ baseUrl: getApiBaseURL() });

  serverApiClient.use(authorizationMiddleware);

  return serverApiClient;
}

export function toBearerToken(accessToken: string) {
  return `Bearer ${accessToken}`;
}
