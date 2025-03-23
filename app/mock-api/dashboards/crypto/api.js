import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { crypto as cryptoData } from "./data";
import { cloneDeep } from 'lodash-es';
let CryptoMockApi = class CryptoMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._crypto = cryptoData;
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
        // @ Crypto - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/dashboards/crypto')
            .reply(() => [200, cloneDeep(this._crypto)]);
    }
};
CryptoMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], CryptoMockApi);
export { CryptoMockApi };
//# sourceMappingURL=api.js.map