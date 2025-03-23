import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FusePlatformService = class FusePlatformService {
    /**
     * Constructor
     */
    constructor(_platform) {
        this._platform = _platform;
        this.osName = 'os-unknown';
        // If the platform is not a browser, return immediately
        if (!this._platform.isBrowser) {
            return;
        }
        // Windows
        if (navigator.userAgent.includes('Win')) {
            this.osName = 'os-windows';
        }
        // Mac OS
        if (navigator.userAgent.includes('Mac')) {
            this.osName = 'os-mac';
        }
        // Unix
        if (navigator.userAgent.includes('X11')) {
            this.osName = 'os-unix';
        }
        // Linux
        if (navigator.userAgent.includes('Linux')) {
            this.osName = 'os-linux';
        }
        // iOS
        if (this._platform.IOS) {
            this.osName = 'os-ios';
        }
        // Android
        if (this._platform.ANDROID) {
            this.osName = 'os-android';
        }
    }
};
FusePlatformService = __decorate([
    Injectable({ providedIn: 'root' })
], FusePlatformService);
export { FusePlatformService };
//# sourceMappingURL=platform.service.js.map