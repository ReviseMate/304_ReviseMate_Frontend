import { __decorate } from "tslib";
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
let FuseVerticalNavigationSpacerItemComponent = class FuseVerticalNavigationSpacerItemComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Get the parent navigation component
        this._fuseVerticalNavigationComponent = this._fuseNavigationService.getComponent(this.name);
        // Subscribe to onRefreshed on the navigation component
        this._fuseVerticalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
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
};
__decorate([
    Input()
], FuseVerticalNavigationSpacerItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseVerticalNavigationSpacerItemComponent.prototype, "name", void 0);
FuseVerticalNavigationSpacerItemComponent = __decorate([
    Component({
        selector: 'fuse-vertical-navigation-spacer-item',
        templateUrl: './spacer.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass],
    })
], FuseVerticalNavigationSpacerItemComponent);
export { FuseVerticalNavigationSpacerItemComponent };
//# sourceMappingURL=spacer.component.js.map