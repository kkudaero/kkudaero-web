import Image from 'next/image';
import type { ReactNode } from 'react';

import { SERVICE_NAME } from '@/shared/lib/features';

type SellerAuthShellProps = {
  children: ReactNode;
};

const HEADLINE_LINES = ['일본 구매대행,', '처음이어도 막히지 않게'];
const DESKTOP_DESCRIPTION =
  '관부가세 계산부터 통관 보류 대응까지, 1인 셀러가 혼자서도 처리할 수 있게 도와드려요.';
const MOBILE_DESCRIPTION = '관부가세 계산부터 통관 보류 대응까지 도와드려요.';
const FOOTNOTE = `© 2026 ${SERVICE_NAME} · 통관 신고 대행은 하지 않아요`;
const HIGHLIGHTS = [
  { iconPath: '/icons/calculator-on-brand.svg', label: '150달러 목록통관 기준 관부가세·마진 계산' },
  { iconPath: '/icons/truck-on-brand.svg', label: '통관 진행 조회와 보류 알림' },
  { iconPath: '/icons/chat-on-brand.svg', label: '상황별 대응 매뉴얼과 고객 안내 문구' },
];
const HIGHLIGHT_ICON_SIZE = 20;
const LOGO_SIZE = 40;
const LOGO_MARK_ICON_SIZE = 31;

export function SellerAuthShell({ children }: SellerAuthShellProps) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <BrandPanel />
      <main className="flex flex-1 flex-col gap-10 bg-surface px-6 pt-24 pb-10 lg:items-center lg:justify-center lg:p-10">
        <MobileIntro />
        <div className="flex w-full flex-col gap-10 lg:w-[400px] lg:gap-6">{children}</div>
      </main>
    </div>
  );
}

function BrandPanel() {
  return (
    <aside className="hidden w-[44.444%] shrink-0 flex-col justify-between bg-brand px-[72px] py-16 text-on-brand lg:flex">
      <div className="flex items-center gap-3">
        <Image src="/images/logo-rounded.svg" alt="" width={LOGO_SIZE} height={LOGO_SIZE} />
        <p className="text-[22px]">{SERVICE_NAME}</p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-[40px] leading-[1.35]">
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="text-[17px] leading-[1.6] opacity-90">{DESKTOP_DESCRIPTION}</p>
        <ul className="flex flex-col gap-3 pt-4">
          {HIGHLIGHTS.map((highlight) => (
            <li
              key={highlight.label}
              className="flex items-center gap-3 rounded-xl bg-white/16 px-4 py-3 text-[15px]"
            >
              <Image
                src={highlight.iconPath}
                alt=""
                width={HIGHLIGHT_ICON_SIZE}
                height={HIGHLIGHT_ICON_SIZE}
                className="shrink-0"
              />
              {highlight.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-[13px] opacity-75">{FOOTNOTE}</p>
    </aside>
  );
}

function MobileIntro() {
  return (
    <div className="flex flex-col gap-4 lg:hidden">
      <div className="flex size-12 items-center justify-center rounded-[13px] bg-brand">
        <Image
          src="/icons/package-on-brand.svg"
          alt=""
          width={LOGO_MARK_ICON_SIZE}
          height={LOGO_MARK_ICON_SIZE}
        />
      </div>
      <p className="text-[26px] font-bold">
        {HEADLINE_LINES.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <p className="text-[15px] text-content-secondary">{MOBILE_DESCRIPTION}</p>
    </div>
  );
}
