import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";
import {AuthService} from "./shared/services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogin: boolean = true;
  displayName = "";

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
    authService.getUser().then(user => {
      this.displayName = `${user.firstname} ${user.lastname}`;
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => this.updateBodyClass(event.bodyClass));
  }

  private updateBodyClass(customBodyClass?: string) {
    this.renderer.setAttribute(this.document?.body, 'class', '');
    if (customBodyClass) {
      this.isLogin = true;
      this.renderer.addClass(this.document?.body, customBodyClass);
    } else {
      this.isLogin = false;
    }
  }

  onLogoutClick() {
    this.authService.logout();
  }

}
