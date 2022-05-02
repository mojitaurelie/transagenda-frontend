import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SystemService} from "../shared/services/system/system.service";
import {AuthService} from "../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usernameFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  allowRegister: boolean = false;

  errorMessage: string = "";

  constructor(private systemService: SystemService, private authService: AuthService, private router: Router) {
    systemService.ServerInformation()
      .then((info) => this.allowRegister = info.allow_register)
      .catch((err) => console.error(err))
  }

  ngOnInit(): void {
  }

  loginOnClick() {
    this.authService.login(this.usernameFormControl.value, this.passwordFormControl.value).then((res) => {
      if (res) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = "Failed to connect: unknown error";
      }
    }).catch(err => this.errorMessage = "Failed to connect: " + err.message)
  }

}
