import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, ReplaySubject, switchMap, take, tap } from 'rxjs';
let NotificationsService = class NotificationsService {
    /**
     * Constructor
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._notifications = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for notifications
     */
    get notifications$() {
        return this._notifications.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get all notifications
     */
    getAll() {
        return this._httpClient.get('api/common/notifications').pipe(tap((notifications) => {
            this._notifications.next(notifications);
        }));
    }
    /**
     * Create a notification
     *
     * @param notification
     */
    create(notification) {
        return this.notifications$.pipe(take(1), switchMap(notifications => this._httpClient.post('api/common/notifications', { notification }).pipe(map((newNotification) => {
            // Update the notifications with the new notification
            this._notifications.next([...notifications, newNotification]);
            // Return the new notification from observable
            return newNotification;
        }))));
    }
    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id, notification) {
        return this.notifications$.pipe(take(1), switchMap(notifications => this._httpClient.patch('api/common/notifications', {
            id,
            notification,
        }).pipe(map((updatedNotification) => {
            // Find the index of the updated notification
            const index = notifications.findIndex(item => item.id === id);
            // Update the notification
            notifications[index] = updatedNotification;
            // Update the notifications
            this._notifications.next(notifications);
            // Return the updated notification
            return updatedNotification;
        }))));
    }
    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id) {
        return this.notifications$.pipe(take(1), switchMap(notifications => this._httpClient.delete('api/common/notifications', { params: { id } }).pipe(map((isDeleted) => {
            // Find the index of the deleted notification
            const index = notifications.findIndex(item => item.id === id);
            // Delete the notification
            notifications.splice(index, 1);
            // Update the notifications
            this._notifications.next(notifications);
            // Return the deleted status
            return isDeleted;
        }))));
    }
    /**
     * Mark all notifications as read
     */
    markAllAsRead() {
        return this.notifications$.pipe(take(1), switchMap(notifications => this._httpClient.get('api/common/notifications/mark-all-as-read').pipe(map((isUpdated) => {
            // Go through all notifications and set them as read
            notifications.forEach((notification, index) => {
                notifications[index].read = true;
            });
            // Update the notifications
            this._notifications.next(notifications);
            // Return the updated status
            return isUpdated;
        }))));
    }
};
NotificationsService = __decorate([
    Injectable({ providedIn: 'root' })
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map