import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from "../../environments/environment";
let SuperService = class SuperService {
    constructor(controller) {
        this.controller = controller;
        this.http = inject(HttpClient);
        this.urlApi = environment.apiUrl;
        this.url = environment.url;
        this.getAll = () => this.http.get(`${this.url}/${this.controller}`, { withCredentials: true });
        this.put = (id, o) => this.http.patch(`${this.url}/${this.controller}/${id}`, o, { withCredentials: true });
        this.get = () => this.http.get(`${this.url}/${this.controller}/get`, { withCredentials: true });
        this.count = () => this.http.get(`${this.url}/${this.controller}/count`, { withCredentials: true });
        this.getOne = (id) => this.http.get(`${this.url}/${this.controller}/${id}`, { withCredentials: true });
        this.post = (o) => this.http.post(`${this.url}/${this.controller}`, o, { withCredentials: true });
        this.delete = (id) => this.http.delete(`${this.url}/${this.controller}/${id}`, { withCredentials: true });
    }
    patch(id, model) {
        return this.http.patch(`${this.url}/${this.controller}/${id}`, model, { withCredentials: true });
    }
};
SuperService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SuperService);
export { SuperService };
//# sourceMappingURL=super.service.js.map