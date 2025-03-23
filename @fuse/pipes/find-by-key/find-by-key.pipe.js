import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
/**
 * Finds an object from given source using the given key - value pairs
 */
let FuseFindByKeyPipe = class FuseFindByKeyPipe {
    /**
     * Constructor
     */
    constructor() {
    }
    /**
     * Transform
     *
     * @param value A string or an array of strings to find from source
     * @param key Key of the object property to look for
     * @param source Array of objects to find from
     */
    transform(value, key, source) {
        // If the given value is an array of strings...
        if (Array.isArray(value)) {
            return value.map(item => source.find(sourceItem => sourceItem[key] === item));
        }
        // If the value is a string...
        return source.find(sourceItem => sourceItem[key] === value);
    }
};
FuseFindByKeyPipe = __decorate([
    Pipe({
        name: 'fuseFindByKey',
        pure: false,
        standalone: true,
    })
], FuseFindByKeyPipe);
export { FuseFindByKeyPipe };
//# sourceMappingURL=find-by-key.pipe.js.map