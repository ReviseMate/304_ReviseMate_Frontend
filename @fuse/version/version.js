/**
 * Derived from Angular's version class
 */
export class Version {
    /**
     * Constructor
     */
    constructor(version) {
        this.version = version;
        this.full = version;
        this.major = version.split('.')[0];
        this.minor = version.split('.')[1];
        this.patch = version.split('.').slice(2).join('.');
    }
}
//# sourceMappingURL=version.js.map