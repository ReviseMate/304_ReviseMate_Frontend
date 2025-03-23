import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from "../../../../@fuse/animations";
let AuthConfirmationRequiredComponent = class AuthConfirmationRequiredComponent {
    /**
     * Constructor
     */
    constructor() {
    }
};
AuthConfirmationRequiredComponent = __decorate([
    Component({
        selector: 'auth-confirmation-required',
        templateUrl: './confirmation-required.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        standalone: true,
        imports: [RouterLink],
    })
], AuthConfirmationRequiredComponent);
export { AuthConfirmationRequiredComponent };
//# sourceMappingURL=confirmation-required.component.js.map