import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatModule } from "../../../mat.modules";
let TableauBordComponent = class TableauBordComponent {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }
    ngOnInit() {
        console.log(this.user);
    }
};
TableauBordComponent = __decorate([
    Component({
        selector: 'app-tableau-bord',
        standalone: true,
        imports: [CommonModule, RouterLink, MatModule],
        templateUrl: './tableau-bord.component.html',
        styleUrls: ['./tableau-bord.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], TableauBordComponent);
export { TableauBordComponent };
//# sourceMappingURL=tableau-bord.component.js.map