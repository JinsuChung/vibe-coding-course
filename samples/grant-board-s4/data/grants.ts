export type Grant = { id: number; title: string; agency: string; deadline: string; owner: string };

// 교육용 가상 데이터
export const grants: Grant[] = [
  { id: 1, title: '2026 지역혁신 산학협력 지원사업', agency: '가상혁신진흥원', deadline: '2026-11-14', owner: '김산단' },
  { id: 2, title: '국가R&D 기초연구 신규과제', agency: '가상연구재단', deadline: '2026-10-28', owner: '이협력' },
  { id: 3, title: '기업 수요기반 공동연구', agency: '가온테크', deadline: '2026-12-05', owner: '박연구' },
  { id: 4, title: '청년 연구인력 채용지원', agency: '가상산업원', deadline: '2026-10-20', owner: '김산단' },
  { id: 5, title: '대학 기술사업화 촉진사업', agency: '가상기술원', deadline: '2026-11-30', owner: '최기술' },
  { id: 6, title: '바이오헬스 실증 연구', agency: '나래바이오', deadline: '2027-01-15', owner: '정바이오' },
  { id: 7, title: '탄소중립 소재 개발', agency: '다올소재', deadline: '2026-12-19', owner: '이협력' },
  { id: 8, title: '로봇 서비스 리빙랩', agency: '라온로보틱스', deadline: '2026-11-07', owner: '박연구' },
  { id: 9, title: '공공데이터 활용 창업지원', agency: '가상데이터진흥원', deadline: '2026-10-31', owner: '한데이터' },
  { id: 10, title: '스마트팜 현장 연구', agency: '새솔푸드', deadline: '2027-02-02', owner: '최기술' },
];
