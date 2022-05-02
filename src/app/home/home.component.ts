import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {DataService} from "../shared/services/data/data.service";
import {Appointment, Contact, Prescription} from "../shared/model/data.model";
import { faPills, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faPills = faPills;
  faMapPin = faMapPin;

  displayName = "";
  contacts: Contact[] = [];
  appointments: Appointment[] = [];
  prescriptions: Prescription[] = [];

  constructor(private authService: AuthService, private dataService: DataService) {
    authService.getUser().then(user => {
      this.displayName = `${user.firstname} ${user.lastname}`;
    });
    this.load();
  }

  private load() {
    this.dataService.getContacts().then(contacts => {
      this.contacts = contacts;
    });
    this.dataService.getAppointments().then(appointments => {
      this.appointments = appointments;
    });
    this.dataService.getPrescriptions().then(prescriptions => {
      this.prescriptions = prescriptions;
    });
  }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logout();
  }

}
