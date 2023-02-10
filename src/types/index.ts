export type User = {
  blocked?: boolean;
  confirmed: boolean;
  created_at: string;
  created_by?: string;
  email: string;
  fullName: string;
  id: number;
  provider: string;
  role: any;
  updated_at: string;
  updated_by?: string;
  username: string;
};
