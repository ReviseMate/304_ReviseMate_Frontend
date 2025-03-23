import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, takeUntil } from 'rxjs';
let FuseLoadingBarComponent = class FuseLoadingBarComponent {
    /**
     * Constructor
     */
    constructor(_fuseLoadingService) {
        this._fuseLoadingService = _fuseLoadingService;
        this.autoMode = true;
        this.progress = 0;
        this.show = false;
        this._unsubscribeAll = new Subject();
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
        // Auto mode
        if ('autoMode' in changes) {
            // Set the auto mode in the service
            this._fuseLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to the service
        this._fuseLoadingService.mode$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
            this.mode = value;
        });
        this._fuseLoadingService.progress$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
            this.progress = value;
        });
        this._fuseLoadingService.show$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) => {
            this.show = value;
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
};
__decorate([
    Input()
], FuseLoadingBarComponent.prototype, "autoMode", void 0);
FuseLoadingBarComponent = __decorate([
    Component({
        selector: 'fuse-loading-bar',
        templateUrl: './loading-bar.component.html',
        styleUrls: ['./loading-bar.component.scss'],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'fuseLoadingBar',
        standalone: true,
        imports: [NgIf, MatProgressBarModule],
    })
], FuseLoadingBarComponent);
export { FuseLoadingBarComponent };
//# sourceMappingURL=loading-bar.component.js.map