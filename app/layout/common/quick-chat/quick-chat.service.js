import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, tap, throwError } from 'rxjs';
let QuickChatService = class QuickChatService {
    /**
     * Constructor
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._chat = new BehaviorSubject(null);
        this._chats = new BehaviorSubject(null);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for chat
     */
    get chat$() {
        return this._chat.asObservable();
    }
    /**
     * Getter for chat
     */
    get chats$() {
        return this._chats.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get chats
     */
    getChats() {
        return this._httpClient.get('api/apps/chat/chats').pipe(tap((response) => {
            this._chats.next(response);
        }));
    }
    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id) {
        return this._httpClient.get('api/apps/chat/chat', { params: { id } }).pipe(map((chat) => {
            // Update the chat
            this._chat.next(chat);
            // Return the chat
            return chat;
        }), switchMap((chat) => {
            if (!chat) {
                return throwError('Could not found chat with id of ' + id + '!');
            }
            return of(chat);
        }));
    }
};
QuickChatService = __decorate([
    Injectable({ providedIn: 'root' })
], QuickChatService);
export { QuickChatService };
//# sourceMappingURL=quick-chat.service.js.map