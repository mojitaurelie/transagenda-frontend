import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorResponse} from "../error.model";

class ServerInformationResponse {
  allow_register!: boolean;
  version!: string;
  api_version!: number;
  go_version!: string;
  os_name!: string;
  os_architecture!: string;
}

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  public ServerInformation(): Promise<ServerInformationResponse> {
    return this.http.get<ServerInformationResponse|ErrorResponse>("/api/system/information").toPromise().then(res => {
      if ((res as ErrorResponse).error) {
        throw new Error((res as ErrorResponse).message)
      }
      return (res as ServerInformationResponse)
    })
  }
}
