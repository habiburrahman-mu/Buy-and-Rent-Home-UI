import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Buy-and-Rent-Home-UI';
	isLoading = false;
	private hubConnection: SignalR.HubConnection | undefined;

	constructor(private authService: AuthService, private router: Router) {
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
		var token = this.authService.tokenInLocalStorage;
		if (token) {
			if (this.authService.decodedTokenPayload) {
				if (this.authService.isExpired(this.authService.decodedTokenPayload)) {
					this.authService.logOut(false);
				}
			} else {
				this.authService.logOut(false);
			}
		}

		var options: SignalR.IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.authService.tokenInLocalStorage;
			},
			// skipNegotiation: true,
			transport: SignalR.HttpTransportType.WebSockets,
			withCredentials: false
		};

		this.hubConnection = new SignalR.HubConnectionBuilder()
			.withUrl(environment.baseUrl + '/notifications', options)
			.withAutomaticReconnect()
			.build();

		this.hubConnection.start()
			.then(_ => console.log("connected to notifications hub"))
			.catch(err => console.log("error while connecting to notifications hub", err));

			this.hubConnection.on("ReceiveNotification", this.onReceiveNotification)
	}
	onReceiveNotification(test: any) {
		console.log(test);
	}
}
