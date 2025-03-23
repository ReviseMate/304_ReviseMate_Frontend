import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let RolesService = class RolesService extends SuperService {
    constructor() {
        super('super/role');
    }
};
RolesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RolesService);
export { RolesService };
//# sourceMappingURL=roles.service.js.map