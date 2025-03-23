import { __decorate } from "tslib";
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseHorizontalNavigationBasicItemComponent } from "../basic/basic.component";
import { FuseHorizontalNavigationDividerItemComponent } from "../divider/divider.component";
import { Subject, takeUntil } from 'rxjs';
let FuseHorizontalNavigationBranchItemComponent = class FuseHorizontalNavigationBranchItemComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        /* eslint-enable @typescript-eslint/naming-convention */
        this.child = false;
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Trigger the change detection
     */
    triggerChangeDetection() {
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
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
], FuseHorizontalNavigationBranchItemComponent.prototype, "child", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationBranchItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationBranchItemComponent.prototype, "name", void 0);
__decorate([
    ViewChild('matMenu', { static: true })
], FuseHorizontalNavigationBranchItemComponent.prototype, "matMenu", void 0);
FuseHorizontalNavigationBranchItemComponent = __decorate([
    Component({
        selector: 'fuse-horizontal-navigation-branch-item',
        templateUrl: './branch.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgIf, NgClass, MatMenuModule, NgTemplateOutlet, NgFor, FuseHorizontalNavigationBasicItemComponent, forwardRef(() => FuseHorizontalNavigationBranchItemComponent), FuseHorizontalNavigationDividerItemComponent, MatTooltipModule, MatIconModule],
    })
], FuseHorizontalNavigationBranchItemComponent);
export { FuseHorizontalNavigationBranchItemComponent };
//# sourceMappingURL=branch.component.js.map