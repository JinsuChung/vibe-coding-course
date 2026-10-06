import type { ReactNode } from 'react';
import './globals.css';

export const metadata = { title: '삼육대 산단 공모 보드', description: '연구과제 공모 일정 D-day 보드 (교육용)' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
