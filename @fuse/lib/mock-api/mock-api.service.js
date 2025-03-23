import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FuseMockApiHandler } from "./mock-api.request-handler";
import { compact, fromPairs } from 'lodash-es';
let FuseMockApiService = class FuseMockApiService {
    /**
     * Constructor
     */
    constructor() {
        this._handlers = {
            'get': new Map(),
            'post': new Map(),
            'patch': new Map(),
            'delete': new Map(),
            'put': new Map(),
            'head': new Map(),
            'jsonp': new Map(),
            'options': new Map(),
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Find the handler from the service
     * with the given method and url
     *
     * @param method
     * @param url
     */
    findHandler(method, url) {
        // Prepare the return object
        const matchingHandler = {
            handler: undefined,
            urlParams: {},
        };
        // Split the url
        const urlParts = url.split('/');
        // Get all related request handlers
        const handlers = this._handlers[method.toLowerCase()];
        // Iterate through the handlers
        handlers.forEach((handler, handlerUrl) => {
            // Skip if there is already a matching handler
            if (matchingHandler.handler) {
                return;
            }
            // Split the handler url
            const handlerUrlParts = handlerUrl.split('/');
            // Skip if the lengths of the urls we are comparing are not the same
            if (urlParts.length !== handlerUrlParts.length) {
                return;
            }
            // Compare
            const matches = handlerUrlParts.every((handlerUrlPart, index) => handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':'));
            // If there is a match...
            if (matches) {
                // Assign the matching handler
                matchingHandler.handler = handler;
                // Extract and assign the parameters
                matchingHandler.urlParams = fromPairs(compact(handlerUrlParts.map((handlerUrlPart, index) => handlerUrlPart.startsWith(':') ? [handlerUrlPart.substring(1), urlParts[index]] : undefined)));
            }
        });
        return matchingHandler;
    }
    /**
     * Register GET request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onGet(url, delay) {
        return this._registerHandler('get', url, delay);
    }
    /**
     * Register POST request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPost(url, delay) {
        return this._registerHandler('post', url, delay);
    }
    /**
     * Register PATCH request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPatch(url, delay) {
        return this._registerHandler('patch', url, delay);
    }
    /**
     * Register DELETE request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onDelete(url, delay) {
        return this._registerHandler('delete', url, delay);
    }
    /**
     * Register PUT request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPut(url, delay) {
        return this._registerHandler('put', url, delay);
    }
    /**
     * Register HEAD request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onHead(url, delay) {
        return this._registerHandler('head', url, delay);
    }
    /**
     * Register JSONP request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onJsonp(url, delay) {
        return this._registerHandler('jsonp', url, delay);
    }
    /**
     * Register OPTIONS request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onOptions(url, delay) {
        return this._registerHandler('options', url, delay);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register and return a new instance of the handler
     *
     * @param method
     * @param url
     * @param delay
     * @private
     */
    _registerHandler(method, url, delay) {
        // Create a new instance of FuseMockApiRequestHandler
        const fuseMockHttp = new FuseMockApiHandler(url, delay);
        // Store the handler to access it from the interceptor
        this._handlers[method].set(url, fuseMockHttp);
        // Return the instance
        return fuseMockHttp;
    }
};
FuseMockApiService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseMockApiService);
export { FuseMockApiService };
//# sourceMappingURL=mock-api.service.js.map