import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
let LandingComponent = class LandingComponent {
};
LandingComponent = __decorate([
    Component({
        selector: 'app-landing',
        standalone: true,
        imports: [CommonModule, LandingHomeComponent, HeaderComponent],
        templateUrl: './landing.component.html',
    })
], LandingComponent);
export { LandingComponent };
//# sourceMappingURL=landing.component.js.map