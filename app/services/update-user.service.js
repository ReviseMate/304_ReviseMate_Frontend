import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserUpdateService = class UserUpdateService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000/super/user';
    }
    // Méthode pour mettre à jour un utilisateur
    updateUser(id, user) {
        return this.http.put(`${this.baseUrl}/${id}`, user);
    }
};
UserUpdateService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserUpdateService);
export { UserUpdateService };
//# sourceMappingURL=update-user.service.js.map