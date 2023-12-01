export interface User {
  id?: string;
  email?: string | null;
  username?: string; // Haz el campo username opcional
  active?: boolean;
  subscribed?: boolean;
  sub_start?: Date | null;
  sub_end?: Date | null;
  admin?: boolean;
}
