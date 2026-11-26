import { writeFile } from 'node:fs/promises';

import openapiTS, { astToString } from 'openapi-typescript';

const API_DOCS_PATH = '/v3/api-docs';
const OUTPUT_FILE_URL = new URL('../src/shared/api/schema.d.ts', import.meta.url);

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseURL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL이 없습니다. .env.example을 참고해 설정해 주세요.');
}

const ast = await openapiTS(new URL(API_DOCS_PATH, apiBaseURL));

await writeFile(OUTPUT_FILE_URL, astToString(ast));
