import { __decorate } from "tslib";
import { Directive } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
let FuseScrollResetDirective = class FuseScrollResetDirective {
    /**
     * Constructor
     */
    constructor(_elementRef, _router) {
        this._elementRef = _elementRef;
        this._router = _router;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to NavigationEnd event
        this._router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe(() => {
            // Reset the element's scroll position to the top
            this._elementRef.nativeElement.scrollTop = 0;
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
FuseScrollResetDirective = __decorate([
    Directive({
        selector: '[fuseScrollReset]',
        exportAs: 'fuseScrollReset',
        standalone: true,
    })
], FuseScrollResetDirective);
export { FuseScrollResetDirective };
//# sourceMappingURL=scroll-reset.directive.js.map