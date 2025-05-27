export interface Skill {
  id: number;
  name: string;
  niveau?: string; // ex: "NIV1", "NIV2" si applicable
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}
