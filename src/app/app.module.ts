import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Angular Material
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from "./shared/guard/auth.guard";
import {AuthService} from "./shared/services/auth/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SystemService} from "./shared/services/system/system.service";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {AuthInterceptor} from "./shared/guard/interceptor";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AddAppointmentDialog, CalendarComponent} from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

// FullCalendar module
import dayGridPlugin from '@fullcalendar/daygrid';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CalendarComponent,
    AddAppointmentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    FullCalendarModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    SystemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
