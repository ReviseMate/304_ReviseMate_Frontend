import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let FicheService = class FicheService extends SuperService {
    constructor() {
        super('super/fiche');
    }
};
FicheService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FicheService);
export { FicheService };
//# sourceMappingURL=fiche.service.js.map