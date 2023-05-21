import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ChatConversation } from "src/app/models/chatConversation";

@Injectable({
    providedIn: 'root',
})

export class ChatService {
    private conversationArrayUpdate = new Subject<number>();
    conversationArrayUpdate$ = this.conversationArrayUpdate.asObservable();

    updateConversationArray(userId: number) {
        this.conversationArrayUpdate.next(userId);
    }
}
