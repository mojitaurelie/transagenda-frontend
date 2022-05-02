import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

class AllowRegisterResponse {
  allow_register: boolean = false
}

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  public AllowRegister(): Promise<boolean> {
    return this.http.get<AllowRegisterResponse>("/api/system/allow_register").toPromise().then(res => {
      if (res.allow_register !== undefined) {
        return res.allow_register;
      }
      throw new Error("allow_register not found");
    })
  }
}
