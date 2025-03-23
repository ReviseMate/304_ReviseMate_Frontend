import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FuseDrawerService = class FuseDrawerService {
    /**
     * Constructor
     */
    constructor() {
        this._componentRegistry = new Map();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name, component) {
        this._componentRegistry.set(name, component);
    }
    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name) {
        this._componentRegistry.delete(name);
    }
    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name) {
        return this._componentRegistry.get(name);
    }
};
FuseDrawerService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseDrawerService);
export { FuseDrawerService };
//# sourceMappingURL=drawer.service.js.map