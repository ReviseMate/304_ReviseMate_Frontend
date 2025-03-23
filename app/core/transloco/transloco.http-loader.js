import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
let TranslocoHttpLoader = class TranslocoHttpLoader {
    constructor() {
        this._httpClient = inject(HttpClient);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang) {
        return this._httpClient.get(`./assets/i18n/${lang}.json`);
    }
};
TranslocoHttpLoader = __decorate([
    Injectable({ providedIn: 'root' })
], TranslocoHttpLoader);
export { TranslocoHttpLoader };
//# sourceMappingURL=transloco.http-loader.js.map