import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { finance as financeData } from "./data";
import { cloneDeep } from 'lodash-es';
let FinanceMockApi = class FinanceMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._finance = financeData;
        // Register Mock API handlers
        this.registerHandlers();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register Mock API handlers
     */
    registerHandlers() {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/finance')
            .reply(() => [200, cloneDeep(this._finance)]);
    }
};
FinanceMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], FinanceMockApi);
export { FinanceMockApi };
//# sourceMappingURL=api.js.map