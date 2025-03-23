import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, ReplaySubject, switchMap, take, tap } from 'rxjs';
let ShortcutsService = class ShortcutsService {
    /**
     * Constructor
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._shortcuts = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for shortcuts
     */
    get shortcuts$() {
        return this._shortcuts.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get all messages
     */
    getAll() {
        return this._httpClient.get('api/common/shortcuts').pipe(tap((shortcuts) => {
            this._shortcuts.next(shortcuts);
        }));
    }
    /**
     * Create a shortcut
     *
     * @param shortcut
     */
    create(shortcut) {
        return this.shortcuts$.pipe(take(1), switchMap(shortcuts => this._httpClient.post('api/common/shortcuts', { shortcut }).pipe(map((newShortcut) => {
            // Update the shortcuts with the new shortcut
            this._shortcuts.next([...shortcuts, newShortcut]);
            // Return the new shortcut from observable
            return newShortcut;
        }))));
    }
    /**
     * Update the shortcut
     *
     * @param id
     * @param shortcut
     */
    update(id, shortcut) {
        return this.shortcuts$.pipe(take(1), switchMap(shortcuts => this._httpClient.patch('api/common/shortcuts', {
            id,
            shortcut,
        }).pipe(map((updatedShortcut) => {
            // Find the index of the updated shortcut
            const index = shortcuts.findIndex(item => item.id === id);
            // Update the shortcut
            shortcuts[index] = updatedShortcut;
            // Update the shortcuts
            this._shortcuts.next(shortcuts);
            // Return the updated shortcut
            return updatedShortcut;
        }))));
    }
    /**
     * Delete the shortcut
     *
     * @param id
     */
    delete(id) {
        return this.shortcuts$.pipe(take(1), switchMap(shortcuts => this._httpClient.delete('api/common/shortcuts', { params: { id } }).pipe(map((isDeleted) => {
            // Find the index of the deleted shortcut
            const index = shortcuts.findIndex(item => item.id === id);
            // Delete the shortcut
            shortcuts.splice(index, 1);
            // Update the shortcuts
            this._shortcuts.next(shortcuts);
            // Return the deleted status
            return isDeleted;
        }))));
    }
};
ShortcutsService = __decorate([
    Injectable({ providedIn: 'root' })
], ShortcutsService);
export { ShortcutsService };
//# sourceMappingURL=shortcuts.service.js.map