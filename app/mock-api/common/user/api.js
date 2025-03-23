import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { user as userData } from "./data";
import { assign, cloneDeep } from 'lodash-es';
let UserMockApi = class UserMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._user = userData;
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
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);
        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/common/user')
            .reply(({ request }) => {
            // Get the user mock-api
            const user = cloneDeep(request.body.user);
            // Update the user mock-api
            this._user = assign({}, this._user, user);
            // Return the response
            return [200, cloneDeep(this._user)];
        });
    }
};
UserMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], UserMockApi);
export { UserMockApi };
//# sourceMappingURL=api.js.map