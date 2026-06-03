import { APIRequestContext } from "@playwright/test";
import loginApi from "../api/loginApi";

export default class apiManager {
  loginApi: loginApi;

  constructor(request: APIRequestContext) {
    this.loginApi = new loginApi(request);
  }
}
