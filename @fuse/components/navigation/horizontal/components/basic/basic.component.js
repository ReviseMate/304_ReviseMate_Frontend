import { __decorate } from "tslib";
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
let FuseHorizontalNavigationBasicItemComponent = class FuseHorizontalNavigationBasicItemComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseNavigationService, _fuseUtilsService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseUtilsService = _fuseUtilsService;
        this._unsubscribeAll = new Subject();
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._fuseUtilsService.exactMatchOptions
                : this._fuseUtilsService.subsetMatchOptions;
        // Get the parent navigation component
        this._fuseHorizontalNavigationComponent = this._fuseNavigationService.getComponent(this.name);
        // Mark for check
        this._changeDetectorRef.markForCheck();
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
], FuseHorizontalNavigationBasicItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationBasicItemComponent.prototype, "name", void 0);
FuseHorizontalNavigationBasicItemComponent = __decorate([
    Component({
        selector: 'fuse-horizontal-navigation-basic-item',
        templateUrl: './basic.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass, NgIf, RouterLink, RouterLinkActive, MatTooltipModule, NgTemplateOutlet, MatMenuModule, MatIconModule],
    })
], FuseHorizontalNavigationBasicItemComponent);
export { FuseHorizontalNavigationBasicItemComponent };
//# sourceMappingURL=basic.component.js.map