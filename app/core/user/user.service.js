import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, ReplaySubject, tap } from 'rxjs';
let UserService = class UserService {
    constructor() {
        this._httpClient = inject(HttpClient);
        this._user = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value) {
        // Store the value
        this._user.next(value);
    }
    get user$() {
        return this._user.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get the current signed-in user data
     */
    get() {
        return this._httpClient.get('api/common/user').pipe(tap((user) => {
            this._user.next(user);
        }));
    }
    /**
     * Update the user
     *
     * @param user
     */
    update(user) {
        return this._httpClient.patch('api/common/user', { user }).pipe(map((response) => {
            this._user.next(response);
        }));
    }
};
UserService = __decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map