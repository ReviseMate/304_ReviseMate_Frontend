import { __decorate } from "tslib";
import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from "../../../../@fuse/components/loading-bar";
import { Subject } from 'rxjs';
let EmptyLayoutComponent = class EmptyLayoutComponent {
    /**
     * Constructor
     */
    constructor() {
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
};
EmptyLayoutComponent = __decorate([
    Component({
        selector: 'empty-layout',
        templateUrl: './empty.component.html',
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [FuseLoadingBarComponent, NgIf, RouterOutlet],
    })
], EmptyLayoutComponent);
export { EmptyLayoutComponent };
//# sourceMappingURL=empty.component.js.map