import { APIRequestContext, APIResponse } from "@playwright/test";
import { iLoginApi } from "../interfaces/iLoginApi";

export default class loginApi implements iLoginApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getToken(): Promise<string> {
    const response = await this.request.get("/web/index.php/auth/login");

    const html = await response.text();
    const match = html.match(/:token="&quot;([^&]+)&quot;"/);

    return match?.[1] ?? "";
  }

  async login(username: string, password: string): Promise<APIResponse> {
    const token = await this.getToken();
    return await this.request.post("/web/index.php/auth/validate", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        _token: token,
        username,
        password,
      },
    });
  }
}
