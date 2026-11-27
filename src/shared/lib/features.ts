export const SERVICE_NAME = '꾸대로';
export const SERVICE_DESCRIPTION =
  '일본 구매대행을 처음 시작하는 1인 사업자가 첫 주문부터 통관까지 혼자 헤매지 않게 돕는 도구';

export const FEATURES = {
  checklist: {
    path: '/checklist',
    title: '시작 체크리스트',
    description: '사업자등록부터 배대지 가입까지 단계별로 진행해요.',
  },
  calculator: {
    path: '/calculator',
    title: '관부가세·마진 계산기',
    description: '목록통관 여부와 예상 관부가세, 예상 마진을 확인해요.',
  },
  customs: {
    path: '/customs',
    title: '통관 조회·알림',
    description: '운송장번호로 통관 진행 상태를 확인해요.',
  },
  manual: {
    path: '/manual',
    title: '대응 매뉴얼',
    description: '통관 보류, 품절, 배송 사고에 대응하는 방법과 고객 안내 문구를 찾아요.',
  },
  orders: {
    path: '/orders',
    title: '주문 추적',
    description: '주문부터 발주, 배대지, 송장까지 한눈에 정리해요.',
  },
} as const;

export const FEATURE_LIST = Object.values(FEATURES);
