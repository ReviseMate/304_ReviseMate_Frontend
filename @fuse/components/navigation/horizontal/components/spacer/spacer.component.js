import { __decorate } from "tslib";
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
let FuseHorizontalNavigationSpacerItemComponent = class FuseHorizontalNavigationSpacerItemComponent {
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
], FuseHorizontalNavigationSpacerItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationSpacerItemComponent.prototype, "name", void 0);
FuseHorizontalNavigationSpacerItemComponent = __decorate([
    Component({
        selector: 'fuse-horizontal-navigation-spacer-item',
        templateUrl: './spacer.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass],
    })
], FuseHorizontalNavigationSpacerItemComponent);
export { FuseHorizontalNavigationSpacerItemComponent };
//# sourceMappingURL=spacer.component.js.map