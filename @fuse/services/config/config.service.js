import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { FUSE_CONFIG } from "./config.constants";
import { merge } from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
let FuseConfigService = class FuseConfigService {
    /**
     * Constructor
     */
    constructor(config) {
        // Private
        this._config = new BehaviorSubject(config);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for config
     */
    set config(value) {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);
        // Execute the observable
        this._config.next(config);
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    get config$() {
        return this._config.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Resets the config to the default
     */
    reset() {
        // Set the config
        this._config.next(this.config);
    }
};
FuseConfigService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(0, Inject(FUSE_CONFIG))
], FuseConfigService);
export { FuseConfigService };
//# sourceMappingURL=config.service.js.map