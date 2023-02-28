import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Buy-and-Rent-Home-UI';

    constructor(private authService: AuthService) { }

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
