import { User } from "../models/authentication/user";

export interface IAuthContext {
  login(username: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  currentUser(): User | null;
}
