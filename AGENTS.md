# AGENTS.md

kkudaero-web에서 작업하는 코딩 에이전트가 따라야 하는 규칙입니다. 어떤 에이전트를 쓰더라도 같은 모양의 코드가 나오게 하는 것이 목적입니다.

꾸대로는 일본 구매대행을 처음 시작하는 1인 사업자를 돕는 서비스입니다. 이 저장소는 셀러가 쓰는 웹이고, 데이터와 계산은 모두 `kkudaero-server`가 맡습니다.

## 1. 프로젝트 정보

- 제품 개요와 1단계 기능은 `docs/PRODUCT.md`에 있습니다. 작업 전에 읽습니다.
- Next.js(App Router), TypeScript `strict` 모드, React 서버 컴포넌트 기본
- 패키지 매니저: pnpm (npm, yarn을 쓰지 않습니다)
- 스타일: Tailwind CSS
- 서버 통신: 서버의 OpenAPI 명세로 생성한 타입과 클라이언트(`openapi-typescript`, `openapi-fetch`)
- 서버 상태: TanStack Query (클라이언트 컴포넌트에서 쓰는 경우)
- 이 저장소는 나중에 **public**으로 공개합니다. 공개돼도 문제없는 코드만 커밋합니다.
- `.env.local`은 git에서 제외된 파일입니다. 이 파일을 만들거나 커밋하지 않습니다. 필요한 변수 이름은 `.env.example`에만 적습니다.

## 2. 빌드 확인

작업을 끝냈다고 말하기 전에 아래 명령이 모두 성공하는지 확인합니다.

```bash
pnpm lint
pnpm typecheck
pnpm build
```

- API 명세가 바뀌었다면 먼저 타입을 다시 생성합니다.

  ```bash
  pnpm api:generate
  ```

- 생성된 파일(`src/shared/api/schema.d.ts`)은 직접 수정하지 않습니다.

## 3. 폴더 구조

```
src/
├─ app/                       라우트(page.tsx, layout.tsx), 라우트 전용 loading/error
├─ features/
│  └─ <기능>/
│     ├─ components/          <기능><이름>.tsx
│     ├─ hooks/               use<기능><이름>.ts
│     ├─ api/                 <기능>Api.ts (생성된 클라이언트로 호출)
│     └─ model/               <기능>Model.ts (화면용 타입, 변환 함수)
├─ shared/
│  ├─ ui/                     두 기능 이상에서 쓰는 공통 컴포넌트
│  ├─ api/                    apiClient.ts, schema.d.ts(생성 파일)
│  └─ lib/                    날짜·숫자 포맷 등 순수 함수
└─ styles/                    globals.css
```

- 새 화면은 `app/` 아래에 라우트를 만들고, 화면을 이루는 코드는 `features/<기능>`에 둡니다.
- `app/`의 `page.tsx`에는 레이아웃 조립만 둡니다. 로직과 큰 마크업은 `features`로 뺍니다.
- 기능 이름은 서비스 용어를 그대로 씁니다: `checklist`(시작 체크리스트), `calculator`(관부가세·마진 계산), `customs`(통관 조회), `manual`(대응 매뉴얼), `orders`(주문 추적).

## 4. 네이밍

| 종류 | 파일·이름 | 예 |
|---|---|---|
| 컴포넌트 | `<기능><이름>.tsx`, PascalCase | `CustomsStatusCard.tsx` |
| 공통 컴포넌트 | `<이름>.tsx` | `Button.tsx` |
| 훅 | `use<기능><이름>.ts` | `useCustomsStatus.ts` |
| API 모듈 | `<기능>Api.ts` | `customsApi.ts` |
| 화면용 타입 | `<기능><이름>Model` | `CustomsStatusModel` |
| 변환 함수 | `to<이름>Model` | `toCustomsStatusModel` |

- 컴포넌트·타입은 PascalCase, 함수·변수는 camelCase, 상수는 UPPER_SNAKE_CASE를 씁니다.
- 약어는 `ID`, `URL`, `API`, `USD`, `KRW`만 허용하고 대문자로 씁니다. (`orderID`, `imageURL`)
- Boolean은 `is`, `has`, `can`, `should`로 시작합니다.
- API 함수 이름은 HTTP 메서드에 맞춥니다: GET `fetch~`, POST `create~`/`post~`, PUT·PATCH `update~`, DELETE `delete~`.

## 5. 기준 구현

새 기능은 아래 모양을 따릅니다. 기능 이름 `customs`와 필드는 예시입니다.

### API: `features/customs/api/customsApi.ts`

```ts
import { apiClient } from '@/shared/api/apiClient';

export async function fetchCustomsStatus(trackingNumber: string) {
  const { data, error } = await apiClient.GET('/api/v1/customs/{trackingNumber}', {
    params: { path: { trackingNumber } },
  });

  if (error) {
    throw error;
  }

  return data;
}
```

### Model: `features/customs/model/customsModel.ts`

```ts
import type { components } from '@/shared/api/schema';

type CustomsStatusResponse = components['schemas']['CustomsStatusResponse'];

export type CustomsStatusModel = {
  trackingNumber: string;
  statusLabel: string;
  isHeld: boolean;
  updatedAt: Date;
};

export function toCustomsStatusModel(response: CustomsStatusResponse): CustomsStatusModel {
  return {
    trackingNumber: response.trackingNumber,
    statusLabel: response.statusLabel,
    isHeld: response.status === 'HELD',
    updatedAt: new Date(response.updatedAt),
  };
}
```

### Hook: `features/customs/hooks/useCustomsStatus.ts`

```ts
import { useQuery } from '@tanstack/react-query';

import { fetchCustomsStatus } from '../api/customsApi';
import { toCustomsStatusModel } from '../model/customsModel';

export function useCustomsStatus(trackingNumber: string) {
  return useQuery({
    queryKey: ['customs', trackingNumber],
    queryFn: async () => toCustomsStatusModel(await fetchCustomsStatus(trackingNumber)),
  });
}
```

### Component: `features/customs/components/CustomsStatusCard.tsx`

```tsx
'use client';

import { useCustomsStatus } from '../hooks/useCustomsStatus';

type CustomsStatusCardProps = {
  trackingNumber: string;
};

export function CustomsStatusCard({ trackingNumber }: CustomsStatusCardProps) {
  const { data, isPending, isError } = useCustomsStatus(trackingNumber);

  if (isPending) {
    return <CustomsStatusSkeleton />;
  }

  if (isError) {
    return <ErrorMessage message="통관 정보를 불러오지 못했어요." />;
  }

  return (
    <section>
      <p>{data.statusLabel}</p>
    </section>
  );
}
```

## 6. 계층별 규칙

### 데이터와 계산

- **관부가세·마진·150달러 목록통관 판정은 서버가 계산합니다.** 웹은 서버가 준 결과를 보여 주기만 합니다. 같은 계산을 웹에 다시 구현하지 않습니다.
- 계산 결과는 화면에서 항상 **"예상"** 값으로 표시합니다. "확정", "보장" 같은 표현을 쓰지 않습니다.
- 체크리스트, 대응 매뉴얼, 고객 안내 문구는 서비스의 핵심 콘텐츠입니다. 코드에 직접 쓰지 않고 서버 API로 받아 옵니다.
- 서버 응답 타입은 생성된 `schema.d.ts`만 씁니다. 응답 타입을 손으로 다시 정의하지 않습니다.
- 서버 응답은 `model`의 `to<이름>Model`에서 화면용 타입으로 바꿉니다. 컴포넌트가 서버 응답 구조를 직접 알지 않습니다.
- 서버가 주는 시각은 UTC입니다. 화면에 보여 줄 때 `shared/lib`의 포맷 함수로 한국 시간으로 바꿉니다.

### 보안

- `NEXT_PUBLIC_`으로 시작하는 환경변수에는 공개돼도 되는 값(서버 주소 등)만 넣습니다. API 키, 토큰, 시크릿은 웹에 두지 않습니다.
- 관세청·네이버 등 외부 API는 웹에서 직접 부르지 않습니다. 모두 `kkudaero-server`를 거칩니다.
- 개인통관고유부호, 주소, 전화번호는 화면에 보여 줄 때 일부를 가립니다(`P1234****890`). `localStorage`, `sessionStorage`에 저장하지 않습니다.
- 로그(`console.log`)에 개인정보를 남기지 않습니다.

### 컴포넌트

- 기본은 서버 컴포넌트입니다. 상태, 이벤트, 브라우저 API가 필요할 때만 파일 맨 위에 `'use client'`를 씁니다.
- 컴포넌트는 데이터를 그리기만 합니다. API 호출은 `hooks` 또는 서버 컴포넌트의 `api` 호출로 합니다.
- 로딩 중에는 스켈레톤을, 실패하면 `shared/ui`의 `ErrorMessage`를 보여 줍니다. 셀러가 통관 상태를 놓치면 안 되므로 실패를 조용히 숨기지 않습니다.
- props 타입은 `<컴포넌트>Props`로 같은 파일에 선언합니다.
- 순서: import → 타입 → 컴포넌트 → 하위 컴포넌트 → 헬퍼 함수

### 화면 이동

- 페이지 이동은 Next.js `<Link>`와 `useRouter`로 합니다.
- URL에 개인정보(통관부호, 주소, 이름)를 넣지 않습니다.

## 7. 컴포넌트 분리 기준

기준은 **두 번 이상 쓰이는가** 하나입니다.

| 쓰이는 곳 | 만드는 방법 | 위치 |
|---|---|---|
| 한 컴포넌트에서 한 번 | 같은 파일 안의 함수 컴포넌트 | 그 파일 안 |
| 한 기능 안에서 두 번 이상 | `<기능><이름>.tsx` | `features/<기능>/components` |
| 두 기능 이상 | `<이름>.tsx` | `shared/ui` |

- 한 번만 쓰이는 컴포넌트를 미리 파일로 빼지 않습니다.
- 컴포넌트 하나가 150줄을 넘으면 같은 파일 안에서 하위 컴포넌트로 나눕니다.
- 새로 만들기 전에 `shared/ui`와 같은 기능 폴더에 같은 역할의 컴포넌트가 있는지 먼저 찾습니다.

## 8. 코드 스타일

- ESLint와 Prettier 설정을 따릅니다. 규칙을 끄는 주석(`eslint-disable`)을 쓰지 않습니다.
- import 순서: 외부 라이브러리 → 한 줄 띄우고 `@/` 절대 경로 → 한 줄 띄우고 상대 경로
- `any`를 쓰지 않습니다. 모르는 값은 `unknown`으로 받고 좁혀서 씁니다.
- non-null 단언(`!`)과 `as` 강제 변환을 쓰지 않습니다.
- `export default`는 Next.js가 요구하는 파일(`page.tsx`, `layout.tsx` 등)에만 씁니다. 나머지는 named export를 씁니다.
- 하드코딩을 줄입니다. 서버 주소는 환경변수로, 반복되는 문구·숫자는 상수로 둡니다.
- 설명이 필요한 경우를 빼면 주석을 커밋하지 않습니다. 쓰지 않는 코드를 남기지 않습니다.

## 9. Git 규칙

### 작업 유형

| 유형 | 사용 기준 |
|---|---|
| `feat` | 새로운 기능 구현 |
| `design` | 화면 및 UI 디자인 구현·변경 |
| `docs` | README, 문서 수정 |
| `fix` | 버그 수정 |
| `refactor` | 동작을 바꾸지 않는 구조 개선 |
| `hotfix` | 즉시 고쳐야 하는 치명적인 버그 |
| `setting` | 프로젝트 초기 세팅, 빌드·린트·배포 등 환경 설정 |
| `chore` | 의존성 업데이트 등 기타 작업 |

API 연결 작업은 `feat`를 쓰고, 이슈와 PR에 `API` 라벨을 붙입니다.

### 브랜치

- 이슈를 만든 뒤 이슈 번호에 맞는 브랜치를 만듭니다.
- 형식: `<유형>/#<이슈번호>-<작업내용>` (예: `feat/#2-customs-status`)
- 작업 내용은 짧은 영문 소문자와 하이픈으로 씁니다.
- 작업 브랜치에서 `main`으로 PR을 보냅니다. `develop` 브랜치는 쓰지 않습니다.

### 커밋

- 형식: `<유형>: #<이슈번호> <한글 요약>` (예: `feat: #2 통관 상태 카드 구현`)
- 제목은 50자 이내로 씁니다. 필요하면 본문에 자세히 적습니다.
- 목적이 다른 변경은 커밋을 나눕니다.
- 빌드가 실패하는 상태로 커밋하지 않습니다.
- 사용자가 요청할 때만 커밋하고 푸시합니다.
- 커밋 메시지에 에이전트 관련 문구(Co-Authored-By, "Generated with ..." 등)를 넣지 않습니다.

### 이슈와 PR

- 이슈 제목: `[유형] 작업 내용` (예: `[Feat] 통관 상태 조회`)
- PR 제목: `[유형/#이슈번호] 작업 내용` (예: `[Feat/#2] 통관 상태 조회`)
- PR 본문의 `## 🔗 관련 이슈`에 `- Resolved: #이슈번호`를 적어 머지 시 이슈가 닫히게 합니다.
- 1인 개발이므로 PR은 스스로 한 번 더 읽고 머지합니다. 화면을 바꿨다면 PR에 스크린샷을 붙입니다.
- PR 설명에 에이전트 관련 문구를 넣지 않습니다.

## 10. 화면 확인

화면을 만들거나 고쳤다면 `pnpm dev`로 띄워 아래 두 너비에서 직접 확인한 뒤 끝냅니다. 빌드 성공만으로 끝내지 않습니다.

| 너비 | 이유 |
|---|---|
| 375px | 휴대폰에서 셀러가 급하게 통관 상태를 확인하는 경우 |
| 1440px | 데스크톱에서 주문을 정리하는 기본 환경 |

- 글자·버튼이 잘리거나 겹치지 않는지, 표가 좁은 화면에서 가로 스크롤로 끝까지 보이는지 확인합니다.
- 확인한 너비와 결과를 사용자에게 알립니다. 확인하지 못한 화면이 있으면 그대로 알립니다.

## 11. 끝내기 전 확인

1. 2번의 명령이 모두 성공했는가
2. 새 이름이 4번의 표와 맞는가
3. 계산 로직이나 콘텐츠를 웹에 직접 쓰지 않았는가
4. 서버 응답 타입을 손으로 만들지 않고 생성된 타입을 썼는가
5. 비밀값, 개인정보가 코드·로그·URL·저장소에 들어가지 않았는가
6. 한 번만 쓰이는 컴포넌트를 파일로 빼지 않았는가
7. 화면을 건드렸다면 10번의 두 너비에서 확인했는가
