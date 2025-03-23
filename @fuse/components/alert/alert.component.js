import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { fuseAnimations } from "../../animations";
import { filter, Subject, takeUntil } from 'rxjs';
let FuseAlertComponent = class FuseAlertComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseAlertService, _fuseUtilsService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseAlertService = _fuseAlertService;
        this._fuseUtilsService = _fuseUtilsService;
        /* eslint-enable @typescript-eslint/naming-convention */
        this.appearance = 'soft';
        this.dismissed = false;
        this.dismissible = false;
        this.name = this._fuseUtilsService.randomId();
        this.showIcon = true;
        this.type = 'primary';
        this.dismissedChanged = new EventEmitter();
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Host binding for component classes
     */
    get classList() {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'fuse-alert-appearance-border': this.appearance === 'border',
            'fuse-alert-appearance-fill': this.appearance === 'fill',
            'fuse-alert-appearance-outline': this.appearance === 'outline',
            'fuse-alert-appearance-soft': this.appearance === 'soft',
            'fuse-alert-dismissed': this.dismissed,
            'fuse-alert-dismissible': this.dismissible,
            'fuse-alert-show-icon': this.showIcon,
            'fuse-alert-type-primary': this.type === 'primary',
            'fuse-alert-type-accent': this.type === 'accent',
            'fuse-alert-type-warn': this.type === 'warn',
            'fuse-alert-type-basic': this.type === 'basic',
            'fuse-alert-type-info': this.type === 'info',
            'fuse-alert-type-success': this.type === 'success',
            'fuse-alert-type-warning': this.type === 'warning',
            'fuse-alert-type-error': this.type === 'error',
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes) {
        // Dismissed
        if ('dismissed' in changes) {
            // Coerce the value to a boolean
            this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);
            // Dismiss/show the alert
            this._toggleDismiss(this.dismissed);
        }
        // Dismissible
        if ('dismissible' in changes) {
            // Coerce the value to a boolean
            this.dismissible = coerceBooleanProperty(changes.dismissible.currentValue);
        }
        // Show icon
        if ('showIcon' in changes) {
            // Coerce the value to a boolean
            this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to the dismiss calls
        this._fuseAlertService.onDismiss
            .pipe(filter(name => this.name === name), takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Dismiss the alert
            this.dismiss();
        });
        // Subscribe to the show calls
        this._fuseAlertService.onShow
            .pipe(filter(name => this.name === name), takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Show the alert
            this.show();
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
     * Dismiss the alert
     */
    dismiss() {
        // Return if the alert is already dismissed
        if (this.dismissed) {
            return;
        }
        // Dismiss the alert
        this._toggleDismiss(true);
    }
    /**
     * Show the dismissed alert
     */
    show() {
        // Return if the alert is already showing
        if (!this.dismissed) {
            return;
        }
        // Show the alert
        this._toggleDismiss(false);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Dismiss/show the alert
     *
     * @param dismissed
     * @private
     */
    _toggleDismiss(dismissed) {
        // Return if the alert is not dismissible
        if (!this.dismissible) {
            return;
        }
        // Set the dismissed
        this.dismissed = dismissed;
        // Execute the observable
        this.dismissedChanged.next(this.dismissed);
        // Notify the change detector
        this._changeDetectorRef.markForCheck();
    }
};
__decorate([
    Input()
], FuseAlertComponent.prototype, "appearance", void 0);
__decorate([
    Input()
], FuseAlertComponent.prototype, "dismissed", void 0);
__decorate([
    Input()
], FuseAlertComponent.prototype, "dismissible", void 0);
__decorate([
    Input()
], FuseAlertComponent.prototype, "name", void 0);
__decorate([
    Input()
], FuseAlertComponent.prototype, "showIcon", void 0);
__decorate([
    Input()
], FuseAlertComponent.prototype, "type", void 0);
__decorate([
    Output()
], FuseAlertComponent.prototype, "dismissedChanged", void 0);
__decorate([
    HostBinding('class')
], FuseAlertComponent.prototype, "classList", null);
FuseAlertComponent = __decorate([
    Component({
        selector: 'fuse-alert',
        templateUrl: './alert.component.html',
        styleUrls: ['./alert.component.scss'],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: fuseAnimations,
        exportAs: 'fuseAlert',
        standalone: true,
        imports: [NgIf, MatIconModule, MatButtonModule],
    })
], FuseAlertComponent);
export { FuseAlertComponent };
//# sourceMappingURL=alert.component.js.map