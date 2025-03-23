import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let ClasseService = class ClasseService extends SuperService {
    constructor() {
        super('super/classe');
    }
};
ClasseService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClasseService);
export { ClasseService };
//# sourceMappingURL=classe.service.js.map