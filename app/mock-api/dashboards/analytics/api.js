import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { analytics as analyticsData } from "./data";
import { cloneDeep } from 'lodash-es';
let AnalyticsMockApi = class AnalyticsMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._analytics = analyticsData;
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
            .onGet('api/dashboards/analytics')
            .reply(() => [200, cloneDeep(this._analytics)]);
    }
};
AnalyticsMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], AnalyticsMockApi);
export { AnalyticsMockApi };
//# sourceMappingURL=api.js.map