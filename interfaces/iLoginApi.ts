import { APIResponse } from "@playwright/test";

export interface iLoginApi {
  getToken(): Promise<string>;

  login(username: string, password: string): Promise<APIResponse>;
}
