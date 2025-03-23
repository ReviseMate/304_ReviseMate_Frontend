import { __decorate } from "tslib";
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
let FuseVerticalNavigationDividerItemComponent = class FuseVerticalNavigationDividerItemComponent {
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
], FuseVerticalNavigationDividerItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseVerticalNavigationDividerItemComponent.prototype, "name", void 0);
FuseVerticalNavigationDividerItemComponent = __decorate([
    Component({
        selector: 'fuse-vertical-navigation-divider-item',
        templateUrl: './divider.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass],
    })
], FuseVerticalNavigationDividerItemComponent);
export { FuseVerticalNavigationDividerItemComponent };
//# sourceMappingURL=divider.component.js.map