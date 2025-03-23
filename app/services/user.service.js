import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let UserService = class UserService extends SuperService {
    constructor() {
        super('super/user');
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map