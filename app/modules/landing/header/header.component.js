import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from "../../../mat.modules";
import { RouterLink } from '@angular/router';
let HeaderComponent = class HeaderComponent {
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        standalone: true,
        imports: [CommonModule, MatModule, RouterLink],
        templateUrl: './header.component.html',
        styleUrl: './header.component.scss'
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map