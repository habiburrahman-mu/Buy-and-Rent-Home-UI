import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ChatService {
    private _conversationArray: number[] = [];

    get conversationArray() {return [...this._conversationArray]}

    addToConversation(index: number) {
        let existed = this._conversationArray.some(x => x === index);
        if(!existed) {
            this._conversationArray.unshift(index);
        }
    }

    removeConversation(index: number) {
        let indexInArray = this._conversationArray.indexOf(index);
        if(indexInArray > -1) {
            this._conversationArray.splice(indexInArray, 1);
        }
    }
}
