import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
let AuthService = class AuthService {
    constructor() {
        this.http = inject(HttpClient);
        this.url = environment.url;
    }
    signUp(user) {
        return this.http.post(`${this.url}/auth/register`, user, { withCredentials: true });
    }
    login(user) {
        return this.http.post(`${this.url}/auth/login`, user, { withCredentials: true });
    }
    logout() {
        return this.http.post(`${this.url}/auth/logout`, {}, { withCredentials: true });
    }
    VerifyCodeProf(code) {
        return this.http.post(`${this.url}/auth/verifyCode`, { code }, { withCredentials: true });
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map