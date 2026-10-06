'use client';
import { ChatVsAgent } from './chat-vs-agent';
import { AgentLoop } from './agent-loop';
import { CommitTimeline } from './commit-timeline';
import { DeployPipeline } from './deploy-pipeline';
import { RlsDemo } from './rls-demo';
import { KeyPlacement } from './key-placement';
import { Injection } from './injection';

export const simulators = {
  'chat-vs-agent': { C: ChatVsAgent, title: '챗봇 vs 에이전트', session: 1 },
  'agent-loop': { C: AgentLoop, title: '에이전트 루프와 권한 승인', session: 1 },
  'commit-timeline': { C: CommitTimeline, title: '커밋 타임라인', session: 3 },
  'deploy-pipeline': { C: DeployPipeline, title: '배포 파이프라인', session: 4 },
  rls: { C: RlsDemo, title: 'RLS(행 수준 보안)', session: 5 },
  keys: { C: KeyPlacement, title: '공개 키 vs 비밀 키', session: 5 },
  injection: { C: Injection, title: '프롬프트 인젝션', session: 6 },
} as const;

export type SimName = keyof typeof simulators;

export function Sim({ name }: { name: SimName }) {
  const s = simulators[name];
  if (!s) return null;
  const C = s.C;
  return <C />;
}
