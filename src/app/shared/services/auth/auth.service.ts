import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorResponse} from "../error.model";
import {Router} from "@angular/router";
import {User} from "../../model/data.model";

const TOKEN_KEY = "token";

class LoginRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

class LoginResponse {
  token!: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token?: string;

  constructor(private http: HttpClient, private router: Router) {
    const tmp = localStorage.getItem(TOKEN_KEY);
    if (tmp) {
      this.token = tmp;
    }
  }

  public isConnected(): boolean {
    return !!this.token;
  }

  public async login(username: string, password: string): Promise<boolean> {
    if (username.length === 0 || password.length === 0) {
      throw new Error("username or password empty");
    }
    const payload = new LoginRequest(username, password);
    return this.http.post<LoginResponse|ErrorResponse>("/api/login", JSON.stringify(payload)).toPromise().then((res) => {
      console.log(res instanceof LoginResponse);
      if ((res as LoginResponse).token !== undefined) {
        this.setToken((res as LoginResponse).token);
        return true;
      } else {
        throw new Error((res as ErrorResponse).message);
      }
    });
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.token = undefined;
    this.router.navigate(['/login']);
  }

  public getToken(): string | undefined {
    return this.token;
  }

  public async getUser(): Promise<User> {
    return this.http.get<User|ErrorResponse>("/api/user").toPromise().then(res => {
      if ((res as ErrorResponse).error) {
        throw new Error((res as ErrorResponse).message)
      }
      return (res as User)
    });
  }

  private setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.token = token;
  }

}
