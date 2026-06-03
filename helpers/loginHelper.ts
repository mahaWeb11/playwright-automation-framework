import apiManager from "../apiManager/apiManager";

export async function performLogin(
  am: apiManager,
  username: string,
  password: string,
) {
  const response = await am.loginApi.login(username, password);

  const body = await response.text();
  return { response, body };
}
