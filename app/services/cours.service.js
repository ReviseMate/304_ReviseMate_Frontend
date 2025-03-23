import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let CoursService = class CoursService extends SuperService {
    constructor() {
        super('cours');
    }
};
CoursService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CoursService);
export { CoursService };
//# sourceMappingURL=cours.service.js.map