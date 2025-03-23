import { __decorate } from "tslib";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FuseVerticalNavigationBasicItemComponent } from "../basic/basic.component";
import { FuseVerticalNavigationCollapsableItemComponent } from "../collapsable/collapsable.component";
import { FuseVerticalNavigationDividerItemComponent } from "../divider/divider.component";
import { FuseVerticalNavigationSpacerItemComponent } from "../spacer/spacer.component";
import { Subject, takeUntil } from 'rxjs';
let FuseVerticalNavigationGroupItemComponent = class FuseVerticalNavigationGroupItemComponent {
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index, item) {
        return item.id || index;
    }
};
__decorate([
    Input()
], FuseVerticalNavigationGroupItemComponent.prototype, "autoCollapse", void 0);
__decorate([
    Input()
], FuseVerticalNavigationGroupItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseVerticalNavigationGroupItemComponent.prototype, "name", void 0);
FuseVerticalNavigationGroupItemComponent = __decorate([
    Component({
        selector: 'fuse-vertical-navigation-group-item',
        templateUrl: './group.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass, NgIf, MatIconModule, NgFor, FuseVerticalNavigationBasicItemComponent, FuseVerticalNavigationCollapsableItemComponent, FuseVerticalNavigationDividerItemComponent, forwardRef(() => FuseVerticalNavigationGroupItemComponent), FuseVerticalNavigationSpacerItemComponent],
    })
], FuseVerticalNavigationGroupItemComponent);
export { FuseVerticalNavigationGroupItemComponent };
//# sourceMappingURL=group.component.js.map