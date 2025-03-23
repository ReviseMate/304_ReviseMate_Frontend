import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from "./data";
import { cloneDeep } from 'lodash-es';
let NavigationMockApi = class NavigationMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._compactNavigation = compactNavigation;
        this._defaultNavigation = defaultNavigation;
        this._futuristicNavigation = futuristicNavigation;
        this._horizontalNavigation = horizontalNavigation;
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
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {
            // Fill compact navigation children using the default navigation
            this._compactNavigation.forEach((compactNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === compactNavItem.id) {
                        compactNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });
            // Fill futuristic navigation children using the default navigation
            this._futuristicNavigation.forEach((futuristicNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === futuristicNavItem.id) {
                        futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });
            // Fill horizontal navigation children using the default navigation
            this._horizontalNavigation.forEach((horizontalNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === horizontalNavItem.id) {
                        horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                    }
                });
            });
            // Return the response
            return [
                200,
                {
                    compact: cloneDeep(this._compactNavigation),
                    default: cloneDeep(this._defaultNavigation),
                    futuristic: cloneDeep(this._futuristicNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation),
                },
            ];
        });
    }
};
NavigationMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], NavigationMockApi);
export { NavigationMockApi };
//# sourceMappingURL=api.js.map