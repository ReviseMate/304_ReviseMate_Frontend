import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
let FuseAlertService = class FuseAlertService {
    /**
     * Constructor
     */
    constructor() {
        this._onDismiss = new ReplaySubject(1);
        this._onShow = new ReplaySubject(1);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for onDismiss
     */
    get onDismiss() {
        return this._onDismiss.asObservable();
    }
    /**
     * Getter for onShow
     */
    get onShow() {
        return this._onShow.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Dismiss the alert
     *
     * @param name
     */
    dismiss(name) {
        // Return if the name is not provided
        if (!name) {
            return;
        }
        // Execute the observable
        this._onDismiss.next(name);
    }
    /**
     * Show the dismissed alert
     *
     * @param name
     */
    show(name) {
        // Return if the name is not provided
        if (!name) {
            return;
        }
        // Execute the observable
        this._onShow.next(name);
    }
};
FuseAlertService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseAlertService);
export { FuseAlertService };
//# sourceMappingURL=alert.service.js.map