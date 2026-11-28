export const UNAUTHORIZED_STATUS = 401;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | null;

  constructor(status: number, code: string | null) {
    super(`API 요청에 실패했습니다. (${status}${code ? ` ${code}` : ''})`);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export function toApiError(status: number, body: unknown) {
  return new ApiError(status, readErrorCode(body));
}

function readErrorCode(body: unknown) {
  if (
    typeof body === 'object' &&
    body !== null &&
    'code' in body &&
    typeof body.code === 'string'
  ) {
    return body.code;
  }

  return null;
}
