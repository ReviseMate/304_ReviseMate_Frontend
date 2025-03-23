import { __decorate } from "tslib";
import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from "../../animations";
let FuseMasonryComponent = class FuseMasonryComponent {
    /**
     * Constructor
     */
    constructor(_fuseMediaWatcherService) {
        this._fuseMediaWatcherService = _fuseMediaWatcherService;
        this.items = [];
        this.distributedColumns = [];
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
        // Columns
        if ('columns' in changes) {
            // Distribute the items
            this._distributeItems();
        }
        // Items
        if ('items' in changes) {
            // Distribute the items
            this._distributeItems();
        }
    }
    /**
     * After view init
     */
    ngAfterViewInit() {
        // Distribute the items for the first time
        this._distributeItems();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Distribute items into columns
     */
    _distributeItems() {
        // Return an empty array if there are no items
        if (this.items.length === 0) {
            this.distributedColumns = [];
            return;
        }
        // Prepare the distributed columns array
        this.distributedColumns = Array.from(Array(this.columns), item => ({ items: [] }));
        // Distribute the items to columns
        for (let i = 0; i < this.items.length; i++) {
            this.distributedColumns[i % this.columns].items.push(this.items[i]);
        }
    }
};
__decorate([
    Input()
], FuseMasonryComponent.prototype, "columnsTemplate", void 0);
__decorate([
    Input()
], FuseMasonryComponent.prototype, "columns", void 0);
__decorate([
    Input()
], FuseMasonryComponent.prototype, "items", void 0);
FuseMasonryComponent = __decorate([
    Component({
        selector: 'fuse-masonry',
        templateUrl: './masonry.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        exportAs: 'fuseMasonry',
        standalone: true,
        imports: [NgTemplateOutlet],
    })
], FuseMasonryComponent);
export { FuseMasonryComponent };
//# sourceMappingURL=masonry.component.js.map