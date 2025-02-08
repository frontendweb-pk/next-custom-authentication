interface FormState {
  message?: string;
  status?: string;
  errors?: Record<string, string[]>;
}
interface UserPayload {
  user_id: number;
  role: string;
  expireTime: number;
  readonly expires?: Date;
}
