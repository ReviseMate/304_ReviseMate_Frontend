import { __decorate } from "tslib";
import { I18nPluralPipe, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
let AuthSignOutComponent = class AuthSignOutComponent {
    /**
     * Constructor
     */
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.countdown = 5;
        this.countdownMapping = {
            '=1': '# second',
            'other': '# seconds',
        };
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Sign out
        this._authService.signOut();
        // Redirect after the countdown
        timer(1000, 1000)
            .pipe(finalize(() => {
            this._router.navigate(['sign-in']);
        }), takeWhile(() => this.countdown > 0), takeUntil(this._unsubscribeAll), tap(() => this.countdown--))
            .subscribe();
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
};
AuthSignOutComponent = __decorate([
    Component({
        selector: 'auth-sign-out',
        templateUrl: './sign-out.component.html',
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [NgIf, RouterLink, I18nPluralPipe],
    })
], AuthSignOutComponent);
export { AuthSignOutComponent };
//# sourceMappingURL=sign-out.component.js.map