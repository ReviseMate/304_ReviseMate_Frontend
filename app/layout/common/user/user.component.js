import { __decorate } from "tslib";
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
let UserComponent = class UserComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _router, _userService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._router = _router;
        this._userService = _userService;
        /* eslint-enable @typescript-eslint/naming-convention */
        this.showAvatar = true;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user) => {
            this.user = user;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status) {
        // Return if user is not available
        if (!this.user) {
            return;
        }
        // Update the user
        this._userService.update({
            ...this.user,
            status,
        }).subscribe();
    }
    /**
     * Sign out
     */
    signOut() {
        this._router.navigate(['/sign-out']);
    }
};
__decorate([
    Input()
], UserComponent.prototype, "showAvatar", void 0);
UserComponent = __decorate([
    Component({
        selector: 'user',
        templateUrl: './user.component.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'user',
        standalone: true,
        imports: [MatButtonModule, MatMenuModule, NgIf, MatIconModule, NgClass, MatDividerModule],
    })
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.component.js.map