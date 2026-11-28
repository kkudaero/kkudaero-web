import 'server-only';

export function getApiBaseURL() {
  const apiBaseURL = process.env.API_BASE_URL;

  if (!apiBaseURL) {
    throw new Error('API_BASE_URL이 없습니다. .env.example을 참고해 설정해 주세요.');
  }

  return apiBaseURL;
}
