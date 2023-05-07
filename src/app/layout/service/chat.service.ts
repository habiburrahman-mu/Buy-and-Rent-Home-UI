import { Injectable } from "@angular/core";
import { ChatConversation } from "src/app/models/chatConversation";

@Injectable({
    providedIn: 'root',
})

export class ChatService {
    private _conversationArray: ChatConversation[] = [
        {UserId: 1, IsOpen: true},
        {UserId: 2, IsOpen: false},
        {UserId: 3, IsOpen: false},
    ];

    get conversationArray() {return [...this._conversationArray]}

    addToConversation(userId: number) {
        let existed = this._conversationArray.find(x => x.UserId === userId);
        if(existed) {
            this._conversationArray.unshift(existed);
        }
    }

    removeConversation(userId: number) {
        let index = this._conversationArray.findIndex(x => x.UserId === userId);
        if(index > -1) {
            this._conversationArray.splice(index, 1);
        }
    }

    minimizeConversation(index: number) {
        this._conversationArray[index].IsOpen = false;
    }
}
