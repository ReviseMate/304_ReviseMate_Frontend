import { __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs';
let FuseSplashScreenService = class FuseSplashScreenService {
    /**
     * Constructor
     */
    constructor(_document, _router) {
        this._document = _document;
        this._router = _router;
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), take(1))
            .subscribe(() => {
            this.hide();
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the splash screen
     */
    show() {
        this._document.body.classList.remove('fuse-splash-screen-hidden');
    }
    /**
     * Hide the splash screen
     */
    hide() {
        this._document.body.classList.add('fuse-splash-screen-hidden');
    }
};
FuseSplashScreenService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(DOCUMENT))
], FuseSplashScreenService);
export { FuseSplashScreenService };
//# sourceMappingURL=splash-screen.service.js.map