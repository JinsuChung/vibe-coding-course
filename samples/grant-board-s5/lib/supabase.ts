import { createClient } from '@supabase/supabase-js';

// 공개 키(anon/publishable)만 씁니다. 화면에 노출돼도 되는 키이며,
// 누가 무엇을 할 수 있는지는 데이터베이스의 RLS 정책이 지킵니다.
// 비밀 키(service_role)는 이 앱 어디에도 넣지 않습니다.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'missing-key');

export type Grant = {
  id: number;
  title: string;
  agency: string | null;
  deadline: string;
  owner: string | null;
  created_at: string;
};
