import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, ReplaySubject, switchMap, take, tap } from 'rxjs';
let MessagesService = class MessagesService {
    /**
     * Constructor
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._messages = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for messages
     */
    get messages$() {
        return this._messages.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get all messages
     */
    getAll() {
        return this._httpClient.get('api/common/messages').pipe(tap((messages) => {
            this._messages.next(messages);
        }));
    }
    /**
     * Create a message
     *
     * @param message
     */
    create(message) {
        return this.messages$.pipe(take(1), switchMap(messages => this._httpClient.post('api/common/messages', { message }).pipe(map((newMessage) => {
            // Update the messages with the new message
            this._messages.next([...messages, newMessage]);
            // Return the new message from observable
            return newMessage;
        }))));
    }
    /**
     * Update the message
     *
     * @param id
     * @param message
     */
    update(id, message) {
        return this.messages$.pipe(take(1), switchMap(messages => this._httpClient.patch('api/common/messages', {
            id,
            message,
        }).pipe(map((updatedMessage) => {
            // Find the index of the updated message
            const index = messages.findIndex(item => item.id === id);
            // Update the message
            messages[index] = updatedMessage;
            // Update the messages
            this._messages.next(messages);
            // Return the updated message
            return updatedMessage;
        }))));
    }
    /**
     * Delete the message
     *
     * @param id
     */
    delete(id) {
        return this.messages$.pipe(take(1), switchMap(messages => this._httpClient.delete('api/common/messages', { params: { id } }).pipe(map((isDeleted) => {
            // Find the index of the deleted message
            const index = messages.findIndex(item => item.id === id);
            // Delete the message
            messages.splice(index, 1);
            // Update the messages
            this._messages.next(messages);
            // Return the deleted status
            return isDeleted;
        }))));
    }
    /**
     * Mark all messages as read
     */
    markAllAsRead() {
        return this.messages$.pipe(take(1), switchMap(messages => this._httpClient.get('api/common/messages/mark-all-as-read').pipe(map((isUpdated) => {
            // Go through all messages and set them as read
            messages.forEach((message, index) => {
                messages[index].read = true;
            });
            // Update the messages
            this._messages.next(messages);
            // Return the updated status
            return isUpdated;
        }))));
    }
};
MessagesService = __decorate([
    Injectable({ providedIn: 'root' })
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages.service.js.map