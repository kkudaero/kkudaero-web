export interface paths {
    "/api/v1/sellers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 셀러 가입
         * @description 이메일과 비밀번호로 가입합니다. 이미 가입한 이메일이면 409를 돌려줍니다.
         */
        post: operations["createSeller"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/sellers/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 로그인
         * @description 이메일과 비밀번호가 맞으면 액세스 토큰과 만료 시각을 돌려줍니다.
         */
        post: operations["login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/duty-estimates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 관부가세·마진 예상 계산
         * @description 목록통관 여부와 합산과세 위험, 예상 관부가세와 마진을 계산합니다. 환율을 비우면 관세청 과세환율을 쓰고, 계산에 쓴 환율과 기준 시각을 응답에 담습니다. 결과는 예상치이며 저장하지 않습니다.
         */
        post: operations["calculateDutyEstimate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/sellers/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 내 정보 조회
         * @description 액세스 토큰의 주인인 셀러 정보를 돌려줍니다.
         */
        get: operations["getMe"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        SignUpRequest: {
            /**
             * Format: email
             * @description 로그인에 쓸 이메일
             * @example seller@example.com
             */
            email: string;
            /** @description 비밀번호. 공백 없는 영문·숫자·특수문자 8~64자 */
            password: string;
        };
        /** @description 공통 응답 */
        ApiResponseSellerResponse: {
            /** @description 결과 코드. 성공이면 SUCCESS, 실패면 오류 코드 */
            code?: string;
            /** @description 결과 설명 */
            message?: string;
            /** @description 응답 데이터. 실패했거나 돌려줄 값이 없으면 null */
            data?: components["schemas"]["SellerResponse"];
        };
        SellerResponse: {
            /**
             * Format: int64
             * @description 셀러 ID
             */
            id?: number;
            /** @description 이메일 */
            email?: string;
            /**
             * Format: date-time
             * @description 가입 시각(UTC)
             */
            createdAt?: string;
        };
        LoginRequest: {
            /**
             * @description 가입한 이메일
             * @example seller@example.com
             */
            email: string;
            /** @description 비밀번호 */
            password: string;
        };
        /** @description 공통 응답 */
        ApiResponseLoginResponse: {
            /** @description 결과 코드. 성공이면 SUCCESS, 실패면 오류 코드 */
            code?: string;
            /** @description 결과 설명 */
            message?: string;
            /** @description 응답 데이터. 실패했거나 돌려줄 값이 없으면 null */
            data?: components["schemas"]["LoginResponse"];
        };
        LoginResponse: {
            /** @description Authorization 헤더에 Bearer로 넣을 토큰 */
            accessToken?: string;
            /**
             * Format: date-time
             * @description 토큰 만료 시각(UTC)
             */
            expiresAt?: string;
        };
        DutyEstimateRequest: {
            /**
             * @description 일본 판매처에 낸 물품 금액(엔)
             * @example 18000
             */
            itemPriceJpy: number;
            /**
             * @description 일본 내 운임(엔). 물품가격에 포함됩니다.
             * @example 800
             */
            localShippingFeeJpy: number;
            /**
             * @description 같은 날 같은 수취인 이름으로 따로 구매한 다른 물품가격 합계(엔). 없으면 0
             * @example 0
             */
            sameDayOtherItemPriceJpy: number;
            /**
             * @description 한국까지의 국제 배송비(원)
             * @example 12000
             */
            internationalShippingFeeKrw: number;
            /**
             * @description 품목의 관세율(%). 셀러가 확인한 값을 넣습니다.
             * @example 8
             */
            dutyRatePercent: number;
            /**
             * @description 1엔당 원화 환율. 달러 환율과 함께 비우면 관세청 과세환율을 씁니다.
             * @example 9.2
             */
            jpyToKrwRate?: number;
            /**
             * @description 1달러당 원화 환율. 엔 환율과 함께 비우면 관세청 과세환율을 씁니다.
             * @example 1380
             */
            usdToKrwRate?: number;
            /**
             * @description 고객에게 받는 판매가(원)
             * @example 250000
             */
            sellingPriceKrw: number;
            /**
             * @description 판매 채널 수수료율(%)
             * @example 5.5
             */
            salesFeeRatePercent: number;
            /**
             * @description 관부가세를 셀러가 부담하면 true. true면 마진에서 예상 관부가세를 뺍니다.
             * @example false
             */
            isTaxPaidBySeller: boolean;
        };
        /** @description 공통 응답 */
        ApiResponseDutyEstimateResponse: {
            /** @description 결과 코드. 성공이면 SUCCESS, 실패면 오류 코드 */
            code?: string;
            /** @description 결과 설명 */
            message?: string;
            /** @description 응답 데이터. 실패했거나 돌려줄 값이 없으면 null */
            data?: components["schemas"]["DutyEstimateResponse"];
        };
        /** @description 모든 금액은 응답에 담긴 환율로 계산한 예상치입니다. */
        DutyEstimateResponse: {
            /** @description 물품가격(물품 금액 + 일본 내 운임)의 달러 환산값 */
            itemPriceUsd?: number;
            /** @description 목록통관 기준 금액(달러) */
            listClearanceLimitUsd?: number;
            /** @description 물품가격이 기준 금액 이하라 관부가세가 면제되는지 */
            isListClearance?: boolean;
            /** @description 이 건은 기준 이하지만 같은 날 구매분과 합치면 기준을 넘는지 */
            isCombinedTaxationRisk?: boolean;
            /** @description 예상 과세가격(원). 면세면 0 */
            taxableAmountKrw?: number;
            /** @description 예상 관세(원) */
            estimatedDutyKrw?: number;
            /** @description 예상 부가세(원) */
            estimatedVatKrw?: number;
            /** @description 예상 관세와 부가세의 합(원) */
            estimatedTaxKrw?: number;
            /** @description 매입 원가(원). 물품가격을 원화로 바꾼 값 */
            purchaseCostKrw?: number;
            /** @description 판매 채널 수수료(원) */
            salesFeeKrw?: number;
            /** @description 예상 마진(원) */
            estimatedMarginKrw?: number;
            /** @description 판매가 대비 예상 마진율(%) */
            estimatedMarginRatePercent?: number;
            /** @description 계산에 쓴 1엔당 원화 환율 */
            jpyToKrwRate?: number;
            /** @description 계산에 쓴 1달러당 원화 환율 */
            usdToKrwRate?: number;
            /**
             * @description 환율 출처. CUSTOMS는 관세청 과세환율, SELLER_INPUT은 요청에 담긴 값
             * @enum {string}
             */
            exchangeRateSource?: "CUSTOMS" | "SELLER_INPUT";
            /**
             * Format: date
             * @description 과세환율 적용 개시일(한국 날짜). 셀러가 넣은 환율이면 null
             */
            exchangeRateAppliedFrom?: string | null;
            /**
             * Format: date-time
             * @description 과세환율을 조회한 시각(UTC). 셀러가 넣은 환율이면 null
             */
            exchangeRateFetchedAt?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createSeller: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignUpRequest"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponseSellerResponse"];
                };
            };
        };
    };
    login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponseLoginResponse"];
                };
            };
        };
    };
    calculateDutyEstimate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DutyEstimateRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponseDutyEstimateResponse"];
                };
            };
        };
    };
    getMe: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApiResponseSellerResponse"];
                };
            };
        };
    };
}
