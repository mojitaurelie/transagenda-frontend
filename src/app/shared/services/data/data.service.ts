import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorResponse} from "../error.model";
import {Appointment, Contact, Prescription} from "../../model/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public async getContacts(): Promise<Contact[]> {
    return this.http.get<Contact[]|ErrorResponse>("/api/contacts").toPromise().then(res => {
      if ((res as ErrorResponse).error) {
        throw new Error((res as ErrorResponse).message)
      }
      return (res as Contact[])
    });
  }

  public async getAppointments(): Promise<Appointment[]> {
    return this.http.get<Appointment[]|ErrorResponse>("/api/appointments").toPromise().then(res => {
      if ((res as ErrorResponse).error) {
        throw new Error((res as ErrorResponse).message)
      }
      return (res as Appointment[])
    });
  }

  public async getPrescriptions(): Promise<Prescription[]> {
    return this.http.get<Prescription[]|ErrorResponse>("/api/prescriptions").toPromise().then(res => {
      if ((res as ErrorResponse).error) {
        throw new Error((res as ErrorResponse).message)
      }
      return (res as Prescription[])
    });
  }

}
