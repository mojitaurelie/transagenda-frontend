import { Component, OnInit } from '@angular/core';
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


  contacts: Contact[] = [];
  appointments: Appointment[] = [];
  prescriptions: Prescription[] = [];

  loadingAppointment = true;
  loadingContact = true;
  loadingPrescriptions = true;

  constructor(private dataService: DataService) {
    this.load();
  }

  private load() {
    this.dataService.getContacts().then(contacts => {
      this.contacts = contacts;
    }).finally(() => this.loadingContact = false);
    this.dataService.getAppointments().then(appointments => {
      this.appointments = appointments;
    }).finally(() => this.loadingAppointment = false);
    this.dataService.getPrescriptions().then(prescriptions => {
      this.prescriptions = prescriptions;
    }).finally(() => this.loadingPrescriptions = false);
  }

  ngOnInit(): void {
  }

}
