import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ACCESS_TOKEN,
  AUTHORIZATION,
  BEARER_TOKEN_PREFIX,
} from "src/app/core/constants/app-strings";
import { environment } from "src/environments/environment";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../../core/constants/api-endpoint";
import { LoginUser, RegisterUser } from "../../core/model/Auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  registerUser(payload: RegisterUser) {
    const url = environment.APIURL + REGISTER_USER;

    return this.http.post(url, payload);
  }

  loginUser(payload: LoginUser) {
    const url = environment.APIURL + LOGIN_USER;

    return this.http.post(url, payload);
  }

  logout() {
    const url = environment.APIURL + LOGOUT_USER;
    const body = {};
    const headers = {} as any;
    headers[AUTHORIZATION] =
      BEARER_TOKEN_PREFIX + localStorage.getItem(ACCESS_TOKEN);

    return this.http.post(url, body, { headers });
  }
}
