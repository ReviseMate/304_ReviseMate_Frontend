import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
let LandingHomeComponent = class LandingHomeComponent {
    /**
     * Constructor
     */
    constructor() {
    }
};
LandingHomeComponent = __decorate([
    Component({
        selector: 'landing-home',
        templateUrl: './home.component.html',
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [MatButtonModule, RouterLink, MatIconModule, CommonModule],
    })
], LandingHomeComponent);
export { LandingHomeComponent };
//# sourceMappingURL=home.component.js.map