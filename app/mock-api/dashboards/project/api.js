import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { project as projectData } from "./data";
import { cloneDeep } from 'lodash-es';
let ProjectMockApi = class ProjectMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._project = projectData;
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
            .onGet('api/dashboards/project')
            .reply(() => [200, cloneDeep(this._project)]);
    }
};
ProjectMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], ProjectMockApi);
export { ProjectMockApi };
//# sourceMappingURL=api.js.map