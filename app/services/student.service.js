import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StudentService = class StudentService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/super/user/etudiants/details';
    }
    getStudents() {
        return this.http.get(this.apiUrl, { withCredentials: true });
    }
};
StudentService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], StudentService);
export { StudentService };
//# sourceMappingURL=student.service.js.map