# kkudaero-web

일본 구매대행을 처음 시작하는 1인 사업자를 돕는 꾸대로의 셀러용 웹입니다. 제품 개요는 [docs/PRODUCT.md](docs/PRODUCT.md), 작업 규칙은 [AGENTS.md](AGENTS.md)에 있습니다.

## 시작하기

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## 명령

| 명령                | 내용                                                  |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | 개발 서버 실행                                        |
| `pnpm lint`         | ESLint 검사                                           |
| `pnpm typecheck`    | 라우트 타입 생성 후 타입 검사                         |
| `pnpm build`        | 프로덕션 빌드                                         |
| `pnpm format`       | Prettier 포맷                                         |
| `pnpm api:generate` | 서버 OpenAPI 명세로 `src/shared/api/schema.d.ts` 생성 |
