import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let CarteService = class CarteService extends SuperService {
    constructor() {
        super('super/carte_memoire');
    }
};
CarteService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CarteService);
export { CarteService };
//# sourceMappingURL=carte.service.js.map