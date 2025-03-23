import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let RoleService = class RoleService extends SuperService {
    constructor() {
        super('super/role');
    }
};
RoleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RoleService);
export { RoleService };
//# sourceMappingURL=role.service.js.map