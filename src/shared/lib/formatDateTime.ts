const KOREA_LOCALE = 'ko-KR';
const KOREA_TIME_ZONE = 'Asia/Seoul';

const dateTimeFormatter = new Intl.DateTimeFormat(KOREA_LOCALE, {
  timeZone: KOREA_TIME_ZONE,
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function formatDateTime(date: Date) {
  return dateTimeFormatter.format(date);
}
