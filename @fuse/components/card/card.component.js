import { __decorate } from "tslib";
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from "../../animations";
let FuseCardComponent = class FuseCardComponent {
    /**
     * Constructor
     */
    constructor() {
        /* eslint-enable @typescript-eslint/naming-convention */
        this.expanded = false;
        this.face = 'front';
        this.flippable = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Host binding for component classes
     */
    get classList() {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'fuse-card-expanded': this.expanded,
            'fuse-card-face-back': this.flippable && this.face === 'back',
            'fuse-card-face-front': this.flippable && this.face === 'front',
            'fuse-card-flippable': this.flippable,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
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
        // Expanded
        if ('expanded' in changes) {
            // Coerce the value to a boolean
            this.expanded = coerceBooleanProperty(changes.expanded.currentValue);
        }
        // Flippable
        if ('flippable' in changes) {
            // Coerce the value to a boolean
            this.flippable = coerceBooleanProperty(changes.flippable.currentValue);
        }
    }
};
__decorate([
    Input()
], FuseCardComponent.prototype, "expanded", void 0);
__decorate([
    Input()
], FuseCardComponent.prototype, "face", void 0);
__decorate([
    Input()
], FuseCardComponent.prototype, "flippable", void 0);
__decorate([
    HostBinding('class')
], FuseCardComponent.prototype, "classList", null);
FuseCardComponent = __decorate([
    Component({
        selector: 'fuse-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        exportAs: 'fuseCard',
        standalone: true,
        imports: [NgIf],
    })
], FuseCardComponent);
export { FuseCardComponent };
//# sourceMappingURL=card.component.js.map