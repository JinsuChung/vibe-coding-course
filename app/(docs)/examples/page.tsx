import type { Metadata } from 'next';
import { PageShell } from '@/components/ui/page-shell';
import { ExampleGallery } from '@/components/library/example-gallery';

export const metadata: Metadata = {
  title: '업무 예시 30',
  description: '산학협력단 업무에서 바로 만들어 볼 수 있는 인스턴트 소프트웨어 예시 30개.',
};

export default function Page() {
  return (
    <PageShell
      title="업무 예시 30"
      description="산학협력단 업무 장면별로 기획 → 따라 하기 프롬프트 → 검증 포인트 → 확장 아이디어를 담았습니다. 모든 예시는 가상 데이터로 연습하세요."
    >
      <ExampleGallery />
    </PageShell>
  );
}
