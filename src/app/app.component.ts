import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Buy-and-Rent-Home-UI';
    isLoading = false;

    constructor(private authService: AuthService,private router: Router) {
        this.router.events.subscribe((event) => {
            switch (true) {
              case event instanceof NavigationStart: {
                this.isLoading = true;
                break;
              }

              case event instanceof NavigationEnd:
              case event instanceof NavigationCancel:
              case event instanceof NavigationError: {
                this.isLoading = false;
                break;
              }
              default: {
                break;
              }
            }
          });
    }

    ngOnInit(): void {
        console.log("run");
        var token = this.authService.tokenInLocalStorage;
        if (token) {
            if (this.authService.decodedTokenPayload) {
                if(this.authService.isExpired(this.authService.decodedTokenPayload)) {
                    this.authService.logOut(false);
                }
            } else {
                this.authService.logOut(false);
            }
        }
    }
}
