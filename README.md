# 업무를 바꾸는 바이브 코딩

삼육대학교 산학협력단 직원을 위한 Claude Code 바이브 코딩 6회차 실습 사이트입니다.
수업 중에는 함께 보며 따라 하고, 수업 뒤에는 혼자 예습·복습할 수 있습니다.

- 강의: 삼육대학교 기획처 정진수 과장
- 기술: Next.js 16 + Fumadocs + MDX, 정적 사이트 (Vercel 배포)

## 로컬에서 실행

```bash
pnpm install
pnpm dev
```

## 콘텐츠 고치기

| 고칠 것 | 파일 |
| --- | --- |
| 회차 본문 | `content/docs/sessions/*.mdx` |
| 프롬프트 라이브러리 | `content/data/prompts.ts` |
| 업무 예시 30개 | `content/data/examples.ts` |
| 퀴즈 | `content/data/quizzes.ts` |
| 용어사전 / FAQ | `content/data/glossary.ts`, `content/data/faq.ts` |
| 요금·버전 등 바뀌는 정보 | `content/data/facts.ts` |

`main` 브랜치에 푸시하면 Vercel이 자동으로 다시 배포합니다.
