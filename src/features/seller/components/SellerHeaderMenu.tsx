import Link from 'next/link';

import { ApiError, UNAUTHORIZED_STATUS } from '@/shared/api/apiError';
import { getAccessToken } from '@/shared/api/session';
import { LOGIN_PATH } from '@/shared/lib/routes';

import { logoutSeller } from '../api/sellerActions';
import { fetchSellerMe } from '../api/sellerApi';
import { toSellerModel } from '../model/sellerModel';
import type { SellerModel } from '../model/sellerModel';

type SellerSessionResult =
  { status: 'loggedOut' } | { status: 'loggedIn'; seller: SellerModel } | { status: 'failed' };

export async function SellerHeaderMenu() {
  const result = await loadSellerSession();

  if (result.status === 'failed') {
    return (
      <p role="alert" className="text-sm text-red-700">
        로그인 정보를 불러오지 못했어요.
      </p>
    );
  }

  if (result.status === 'loggedOut') {
    return (
      <Link href={LOGIN_PATH} className="text-sm font-semibold hover:underline">
        로그인
      </Link>
    );
  }

  return (
    <form action={logoutSeller} className="flex min-w-0 items-center gap-3 text-sm">
      <span className="truncate text-neutral-600">{result.seller.email}</span>
      <button type="submit" className="shrink-0 font-semibold hover:underline">
        로그아웃
      </button>
    </form>
  );
}

async function loadSellerSession(): Promise<SellerSessionResult> {
  if (!(await getAccessToken())) {
    return { status: 'loggedOut' };
  }

  try {
    return { status: 'loggedIn', seller: toSellerModel(await fetchSellerMe()) };
  } catch (error) {
    if (error instanceof ApiError && error.status === UNAUTHORIZED_STATUS) {
      return { status: 'loggedOut' };
    }

    return { status: 'failed' };
  }
}
