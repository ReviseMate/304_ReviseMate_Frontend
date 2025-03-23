import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let StatistiqueService = class StatistiqueService extends SuperService {
    constructor() {
        super('statistique');
    }
};
StatistiqueService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StatistiqueService);
export { StatistiqueService };
//# sourceMappingURL=statistique.service.js.map