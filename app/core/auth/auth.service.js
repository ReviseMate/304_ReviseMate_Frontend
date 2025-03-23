import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from "./auth.utils";
import { UserService } from "../user/user.service";
import { catchError, of, switchMap, throwError } from 'rxjs';
let AuthService = class AuthService {
    constructor() {
        this._authenticated = false;
        this._httpClient = inject(HttpClient);
        this._userService = inject(UserService);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for access token
     */
    set accessToken(token) {
        localStorage.setItem('accessToken', token);
    }
    get accessToken() {
        return localStorage.getItem('accessToken') ?? '';
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email) {
        return this._httpClient.post('api/auth/forgot-password', email);
    }
    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password) {
        return this._httpClient.post('api/auth/reset-password', password);
    }
    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials) {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post('api/auth/sign-in', credentials).pipe(switchMap((response) => {
            // Store the access token in the local storage
            this.accessToken = response.accessToken;
            // Set the authenticated flag to true
            this._authenticated = true;
            // Store the user on the user service
            this._userService.user = response.user;
            // Return a new observable with the response
            return of(response);
        }));
    }
    /**
     * Sign in using the access token
     */
    signInUsingToken() {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(catchError(() => 
        // Return false
        of(false)), switchMap((response) => {
            // Replace the access token with the new one if it's available on
            // the response object.
            //
            // This is an added optional step for better security. Once you sign
            // in using the token, you should generate a new one on the server
            // side and attach it to the response object. Then the following
            // piece of code can replace the token with the refreshed one.
            if (response.accessToken) {
                this.accessToken = response.accessToken;
            }
            // Set the authenticated flag to true
            this._authenticated = true;
            // Store the user on the user service
            this._userService.user = response.user;
            // Return true
            return of(true);
        }));
    }
    /**
     * Sign out
     */
    signOut() {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        // Set the authenticated flag to false
        this._authenticated = false;
        // Return the observable
        return of(true);
    }
    /**
     * Sign up
     *
     * @param user
     */
    signUp(user) {
        return this._httpClient.post('api/auth/sign-up', user);
    }
    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials) {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }
    /**
     * Check the authentication status
     */
    check() {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }
        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }
        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }
        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map