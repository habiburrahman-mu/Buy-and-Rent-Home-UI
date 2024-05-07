import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from "../services/auth.service";
import { ChatService } from './service/chat.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {
    emptyArrayForChat = new Array<number>(10);
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @ViewChild('op') op: OverlayPanel;

    isOverlayOpen = false;

    loggedInUser!: string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private messageService: MessageService,
        private chatService: ChatService,
        @Inject(DOCUMENT) private document: Document) { }

    loggedIn() {
        this.loggedInUser = localStorage.getItem('brh-userFullName') ?? '';
        return this.loggedInUser;
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    onLogout() {
        this.authService.logOut();
        this.messageService.add({
            severity: 'success',
            summary: 'Logged Out',
            detail: 'Successfully Logged Out'
        });
    }

    onClickMessageCard(index: number) {
        this.chatService.updateConversationArray(index+1);
    }

    onClickMessageIcon(event: any) {
        this.op.show(event);
        this.isOverlayOpen = true;
        this.document.body.style.overflow = 'hidden';
    }

    onHideMessageBox(event: any) {
        this.isOverlayOpen = false;
        this.document.body.style.overflow = 'overlay';
    }
}
