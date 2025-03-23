import { __decorate } from "tslib";
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from "../../../animations";
import { ReplaySubject, Subject } from 'rxjs';
import { FuseHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { FuseHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { FuseHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';
let FuseHorizontalNavigationComponent = class FuseHorizontalNavigationComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseNavigationService, _fuseUtilsService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseUtilsService = _fuseUtilsService;
        this.name = this._fuseUtilsService.randomId();
        this.onRefreshed = new ReplaySubject(1);
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
        // Navigation
        if ('navigation' in changes) {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Make sure the name input is not an empty string
        if (this.name === '') {
            this.name = this._fuseUtilsService.randomId();
        }
        // Register the navigation component
        this._fuseNavigationService.registerComponent(this.name, this);
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Deregister the navigation component from the registry
        this._fuseNavigationService.deregisterComponent(this.name);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Refresh the component to apply the changes
     */
    refresh() {
        // Mark for check
        this._changeDetectorRef.markForCheck();
        // Execute the observable
        this.onRefreshed.next(true);
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
], FuseHorizontalNavigationComponent.prototype, "name", void 0);
__decorate([
    Input()
], FuseHorizontalNavigationComponent.prototype, "navigation", void 0);
FuseHorizontalNavigationComponent = __decorate([
    Component({
        selector: 'fuse-horizontal-navigation',
        templateUrl: './horizontal.component.html',
        styleUrls: ['./horizontal.component.scss'],
        animations: fuseAnimations,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'fuseHorizontalNavigation',
        standalone: true,
        imports: [NgFor, NgIf, FuseHorizontalNavigationBasicItemComponent, FuseHorizontalNavigationBranchItemComponent, FuseHorizontalNavigationSpacerItemComponent],
    })
], FuseHorizontalNavigationComponent);
export { FuseHorizontalNavigationComponent };
//# sourceMappingURL=horizontal.component.js.map