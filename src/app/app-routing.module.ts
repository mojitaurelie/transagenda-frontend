import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent, data: {bodyClass: 'login'} },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
