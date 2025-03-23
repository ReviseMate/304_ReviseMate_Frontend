import { __decorate } from "tslib";
import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatModule } from "../../../mat.modules";
import { UowService } from "../../../services/uow.service";
let HeaderComponent = class HeaderComponent {
    constructor() {
        this.isShowen = false;
        this.uow = inject(UowService);
        this.router = inject(Router);
    }
    profileOptions(event) {
        event.stopPropagation(); // Prevents the event from propagating to the document
        this.isShowen = !this.isShowen;
    }
    onClickOutside(event) {
        // Close the dropdown if the click is outside of it
        if (this.isShowen) {
            this.isShowen = false;
        }
    }
    logout() {
        // localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }
};
__decorate([
    HostListener('document:click', ['$event'])
], HeaderComponent.prototype, "onClickOutside", null);
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        standalone: true,
        imports: [CommonModule, RouterLink, MatModule],
        templateUrl: './header.component.html',
        styleUrl: './header.component.scss'
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map