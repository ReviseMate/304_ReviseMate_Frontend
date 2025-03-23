import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let FuseLoadingService = class FuseLoadingService {
    /**
     * Constructor
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this._auto$ = new BehaviorSubject(true);
        this._mode$ = new BehaviorSubject('indeterminate');
        this._progress$ = new BehaviorSubject(0);
        this._show$ = new BehaviorSubject(false);
        this._urlMap = new Map();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for auto mode
     */
    get auto$() {
        return this._auto$.asObservable();
    }
    /**
     * Getter for mode
     */
    get mode$() {
        return this._mode$.asObservable();
    }
    /**
     * Getter for progress
     */
    get progress$() {
        return this._progress$.asObservable();
    }
    /**
     * Getter for show
     */
    get show$() {
        return this._show$.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the loading bar
     */
    show() {
        this._show$.next(true);
    }
    /**
     * Hide the loading bar
     */
    hide() {
        this._show$.next(false);
    }
    /**
     * Set the auto mode
     *
     * @param value
     */
    setAutoMode(value) {
        this._auto$.next(value);
    }
    /**
     * Set the mode
     *
     * @param value
     */
    setMode(value) {
        this._mode$.next(value);
    }
    /**
     * Set the progress of the bar manually
     *
     * @param value
     */
    setProgress(value) {
        if (value < 0 || value > 100) {
            console.error('Progress value must be between 0 and 100!');
            return;
        }
        this._progress$.next(value);
    }
    /**
     * Sets the loading status on the given url
     *
     * @param status
     * @param url
     */
    _setLoadingStatus(status, url) {
        // Return if the url was not provided
        if (!url) {
            console.error('The request URL must be provided!');
            return;
        }
        if (status === true) {
            this._urlMap.set(url, status);
            this._show$.next(true);
        }
        else if (status === false && this._urlMap.has(url)) {
            this._urlMap.delete(url);
        }
        // Only set the status to 'false' if all outgoing requests are completed
        if (this._urlMap.size === 0) {
            this._show$.next(false);
        }
    }
};
FuseLoadingService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseLoadingService);
export { FuseLoadingService };
//# sourceMappingURL=loading.service.js.map