import { __decorate } from "tslib";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationEnd } from '@angular/router';
import { FuseVerticalNavigationBasicItemComponent } from "../basic/basic.component";
import { FuseVerticalNavigationCollapsableItemComponent } from "../collapsable/collapsable.component";
import { FuseVerticalNavigationDividerItemComponent } from "../divider/divider.component";
import { FuseVerticalNavigationGroupItemComponent } from "../group/group.component";
import { FuseVerticalNavigationSpacerItemComponent } from "../spacer/spacer.component";
import { filter, Subject, takeUntil } from 'rxjs';
let FuseVerticalNavigationAsideItemComponent = class FuseVerticalNavigationAsideItemComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _router, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._router = _router;
        this._fuseNavigationService = _fuseNavigationService;
        this.active = false;
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
        // Active item id
        if ('activeItemId' in changes) {
            // Mark if active
            this._markIfActive(this._router.url);
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Mark if active
        this._markIfActive(this._router.url);
        // Attach a listener to the NavigationEnd event
        this._router.events
            .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
            // Mark if active
            this._markIfActive(event.urlAfterRedirects);
        });
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
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Check if the given item has the given url
     * in one of its children
     *
     * @param item
     * @param currentUrl
     * @private
     */
    _hasActiveChild(item, currentUrl) {
        const children = item.children;
        if (!children) {
            return false;
        }
        for (const child of children) {
            if (child.children) {
                if (this._hasActiveChild(child, currentUrl)) {
                    return true;
                }
            }
            // Skip items other than 'basic'
            if (child.type !== 'basic') {
                continue;
            }
            // Check if the child has a link and is active
            if (child.link && this._router.isActive(child.link, child.exactMatch || false)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Decide and mark if the item is active
     *
     * @private
     */
    _markIfActive(currentUrl) {
        // Check if the activeItemId is equals to this item id
        this.active = this.activeItemId === this.item.id;
        // If the aside has a children that is active,
        // always mark it as active
        if (this._hasActiveChild(this.item, currentUrl)) {
            this.active = true;
        }
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
};
__decorate([
    Input()
], FuseVerticalNavigationAsideItemComponent.prototype, "activeItemId", void 0);
__decorate([
    Input()
], FuseVerticalNavigationAsideItemComponent.prototype, "autoCollapse", void 0);
__decorate([
    Input()
], FuseVerticalNavigationAsideItemComponent.prototype, "item", void 0);
__decorate([
    Input()
], FuseVerticalNavigationAsideItemComponent.prototype, "name", void 0);
__decorate([
    Input()
], FuseVerticalNavigationAsideItemComponent.prototype, "skipChildren", void 0);
FuseVerticalNavigationAsideItemComponent = __decorate([
    Component({
        selector: 'fuse-vertical-navigation-aside-item',
        templateUrl: './aside.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [NgClass, MatTooltipModule, NgIf, MatIconModule, NgFor, FuseVerticalNavigationBasicItemComponent, FuseVerticalNavigationCollapsableItemComponent, FuseVerticalNavigationDividerItemComponent, FuseVerticalNavigationGroupItemComponent, FuseVerticalNavigationSpacerItemComponent],
    })
], FuseVerticalNavigationAsideItemComponent);
export { FuseVerticalNavigationAsideItemComponent };
//# sourceMappingURL=aside.component.js.map