import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { activities as activitiesData } from "./data";
import { cloneDeep } from 'lodash-es';
let ActivitiesMockApi = class ActivitiesMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._activities = activitiesData;
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
        // @ Activities - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/pages/activities')
            .reply(() => [200, cloneDeep(this._activities)]);
    }
};
ActivitiesMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], ActivitiesMockApi);
export { ActivitiesMockApi };
//# sourceMappingURL=api.js.map