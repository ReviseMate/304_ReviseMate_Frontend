import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FuseNavigationService = class FuseNavigationService {
    /**
     * Constructor
     */
    constructor() {
        this._componentRegistry = new Map();
        this._navigationStore = new Map();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register navigation component
     *
     * @param name
     * @param component
     */
    registerComponent(name, component) {
        this._componentRegistry.set(name, component);
    }
    /**
     * Deregister navigation component
     *
     * @param name
     */
    deregisterComponent(name) {
        this._componentRegistry.delete(name);
    }
    /**
     * Get navigation component from the registry
     *
     * @param name
     */
    getComponent(name) {
        return this._componentRegistry.get(name);
    }
    /**
     * Store the given navigation with the given key
     *
     * @param key
     * @param navigation
     */
    storeNavigation(key, navigation) {
        // Add to the store
        this._navigationStore.set(key, navigation);
    }
    /**
     * Get navigation from storage by key
     *
     * @param key
     */
    getNavigation(key) {
        return this._navigationStore.get(key) ?? [];
    }
    /**
     * Delete the navigation from the storage
     *
     * @param key
     */
    deleteNavigation(key) {
        // Check if the navigation exists
        if (!this._navigationStore.has(key)) {
            console.warn(`Navigation with the key '${key}' does not exist in the store.`);
        }
        // Delete from the storage
        this._navigationStore.delete(key);
    }
    /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     */
    getFlatNavigation(navigation, flatNavigation = []) {
        for (const item of navigation) {
            if (item.type === 'basic') {
                flatNavigation.push(item);
                continue;
            }
            if (item.type === 'aside' || item.type === 'collapsable' || item.type === 'group') {
                if (item.children) {
                    this.getFlatNavigation(item.children, flatNavigation);
                }
            }
        }
        return flatNavigation;
    }
    /**
     * Utility function that returns the item
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     */
    getItem(id, navigation) {
        for (const item of navigation) {
            if (item.id === id) {
                return item;
            }
            if (item.children) {
                const childItem = this.getItem(id, item.children);
                if (childItem) {
                    return childItem;
                }
            }
        }
        return null;
    }
    /**
     * Utility function that returns the item's parent
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     * @param parent
     */
    getItemParent(id, navigation, parent) {
        for (const item of navigation) {
            if (item.id === id) {
                return parent;
            }
            if (item.children) {
                const childItem = this.getItemParent(id, item.children, item);
                if (childItem) {
                    return childItem;
                }
            }
        }
        return null;
    }
};
FuseNavigationService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseNavigationService);
export { FuseNavigationService };
//# sourceMappingURL=navigation.service.js.map