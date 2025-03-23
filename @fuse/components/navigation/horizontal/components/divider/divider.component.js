import { __decorate } from "tslib";
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
let FuseHorizontalNavigationDividerItemComponent = class FuseHorizontalNavigationDividerItemComponent {
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
        this._fuseHorizontalNavigationComponent = this._fuseNavigationService.getComponent(this.name);
        // Subscribe to onRefreshed on the navigation component
        this._fuseHorizontalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
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
], FuseHorizontalNavigationDividerItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationDividerItemComponent.prototype, "name", void 0);
FuseHorizontalNavigationDividerItemComponent = __decorate([
    Component({
        selector: 'fuse-horizontal-navigation-divider-item',
        templateUrl: './divider.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass],
    })
], FuseHorizontalNavigationDividerItemComponent);
export { FuseHorizontalNavigationDividerItemComponent };
//# sourceMappingURL=divider.component.js.map