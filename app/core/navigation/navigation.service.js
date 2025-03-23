import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReplaySubject, tap } from 'rxjs';
let NavigationService = class NavigationService {
    constructor() {
        this._httpClient = inject(HttpClient);
        this._navigation = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for navigation
     */
    get navigation$() {
        return this._navigation.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get all navigation data
     */
    get() {
        return this._httpClient.get('api/common/navigation').pipe(tap((navigation) => {
            this._navigation.next(navigation);
        }));
    }
};
NavigationService = __decorate([
    Injectable({ providedIn: 'root' })
], NavigationService);
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map