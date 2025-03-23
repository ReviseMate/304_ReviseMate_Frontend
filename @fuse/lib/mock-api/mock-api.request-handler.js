import { Observable, of, take, throwError } from 'rxjs';
export class FuseMockApiHandler {
    /**
     * Constructor
     */
    constructor(url, delay) {
        this.url = url;
        this.delay = delay;
        // Private
        this._reply = undefined;
        this._replyCount = 0;
        this._replied = 0;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for response callback
     */
    get response() {
        // If the execution limit has been reached, throw an error
        if (this._replyCount > 0 && this._replyCount <= this._replied) {
            return throwError('Execution limit has been reached!');
        }
        // If the response callback has not been set, throw an error
        if (!this._reply) {
            return throwError('Response callback function does not exist!');
        }
        // If the request has not been set, throw an error
        if (!this.request) {
            return throwError('Request does not exist!');
        }
        // Increase the replied count
        this._replied++;
        // Execute the reply callback
        const replyResult = this._reply({
            request: this.request,
            urlParams: this.urlParams,
        });
        // If the result of the reply callback is an observable...
        if (replyResult instanceof Observable) {
            // Return the result as it is
            return replyResult.pipe(take(1));
        }
        // Otherwise, return the result as an observable
        return of(replyResult).pipe(take(1));
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Reply
     *
     * @param callback
     */
    reply(callback) {
        // Store the reply
        this._reply = callback;
    }
    /**
     * Reply count
     *
     * @param count
     */
    replyCount(count) {
        // Store the reply count
        this._replyCount = count;
    }
}
//# sourceMappingURL=mock-api.request-handler.js.map