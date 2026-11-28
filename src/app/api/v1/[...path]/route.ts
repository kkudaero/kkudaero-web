import type { NextRequest } from 'next/server';

import { getApiBaseURL } from '@/shared/api/apiBaseURL';
import { UNAUTHORIZED_STATUS } from '@/shared/api/apiError';
import { AUTHORIZATION_HEADER, toBearerToken } from '@/shared/api/serverApiClient';
import { deleteAccessToken, getAccessToken } from '@/shared/api/session';

const CONTENT_TYPE_HEADER = 'Content-Type';
const METHODS_WITHOUT_BODY = ['GET', 'HEAD'];

async function proxyRequest(request: NextRequest) {
  const upstreamURL = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    getApiBaseURL(),
  );
  const upstreamResponse = await fetch(upstreamURL, {
    method: request.method,
    headers: await createUpstreamHeaders(request),
    body: METHODS_WITHOUT_BODY.includes(request.method) ? undefined : await request.arrayBuffer(),
    cache: 'no-store',
  });

  if (upstreamResponse.status === UNAUTHORIZED_STATUS) {
    await deleteAccessToken();
  }

  const headers = new Headers();
  const contentType = upstreamResponse.headers.get(CONTENT_TYPE_HEADER);

  if (contentType) {
    headers.set(CONTENT_TYPE_HEADER, contentType);
  }

  return new Response(upstreamResponse.body, { status: upstreamResponse.status, headers });
}

async function createUpstreamHeaders(request: NextRequest) {
  const headers = new Headers();
  const contentType = request.headers.get(CONTENT_TYPE_HEADER);
  const accessToken = await getAccessToken();

  if (contentType) {
    headers.set(CONTENT_TYPE_HEADER, contentType);
  }

  if (accessToken) {
    headers.set(AUTHORIZATION_HEADER, toBearerToken(accessToken));
  }

  return headers;
}

export {
  proxyRequest as GET,
  proxyRequest as POST,
  proxyRequest as PUT,
  proxyRequest as PATCH,
  proxyRequest as DELETE,
};
