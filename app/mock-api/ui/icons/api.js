import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { feather, heroicons, material } from "./data";
import { cloneDeep } from 'lodash-es';
let IconsMockApi = class IconsMockApi {
    /**
     * Constructor
     */
    constructor(_fuseMockApiService) {
        this._fuseMockApiService = _fuseMockApiService;
        this._feather = feather;
        this._heroicons = heroicons;
        this._material = material;
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
        // @ Feather icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/feather')
            .reply(() => [
            200,
            {
                namespace: 'feather',
                name: 'Feather',
                grid: 'icon-size-6',
                list: cloneDeep(this._feather),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/heroicons-outline')
            .reply(() => [
            200,
            {
                namespace: 'heroicons_outline',
                name: 'Heroicons Outline',
                grid: 'icon-size-6',
                list: cloneDeep(this._heroicons),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/heroicons-solid')
            .reply(() => [
            200,
            {
                namespace: 'heroicons_solid',
                name: 'Heroicons Solid',
                grid: 'icon-size-6',
                list: cloneDeep(this._heroicons),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons mini icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/heroicons-mini')
            .reply(() => [
            200,
            {
                namespace: 'heroicons_mini',
                name: 'Heroicons Mini',
                grid: 'icon-size-5',
                list: cloneDeep(this._heroicons),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Material solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-solid')
            .reply(() => [
            200,
            {
                namespace: 'mat_solid',
                name: 'Material Solid',
                grid: 'icon-size-6',
                list: cloneDeep(this._material),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Material outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-outline')
            .reply(() => [
            200,
            {
                namespace: 'mat_outline',
                name: 'Material Outline',
                grid: 'icon-size-6',
                list: cloneDeep(this._material),
            },
        ]);
        // -----------------------------------------------------------------------------------------------------
        // @ Material twotone icons - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/ui/icons/material-twotone')
            .reply(() => [
            200,
            {
                namespace: '',
                name: 'Material Twotone',
                grid: 'icon-size-6',
                list: cloneDeep(this._material),
            },
        ]);
    }
};
IconsMockApi = __decorate([
    Injectable({ providedIn: 'root' })
], IconsMockApi);
export { IconsMockApi };
//# sourceMappingURL=api.js.map