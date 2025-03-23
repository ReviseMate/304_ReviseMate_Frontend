import { __decorate } from "tslib";
import { NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from "../../../../@fuse/animations";
import { FuseAlertComponent } from "../../../../@fuse/components/alert";
let AuthUnlockSessionComponent = class AuthUnlockSessionComponent {
    /**
     * Constructor
     */
    constructor(_activatedRoute, _authService, _formBuilder, _router, _userService) {
        this._activatedRoute = _activatedRoute;
        this._authService = _authService;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this._userService = _userService;
        this.alert = {
            type: 'success',
            message: '',
        };
        this.showAlert = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Get the user's name
        this._userService.user$.subscribe((user) => {
            this.name = user.name;
            this._email = user.email;
        });
        // Create the form
        this.unlockSessionForm = this._formBuilder.group({
            name: [
                {
                    value: this.name,
                    disabled: true,
                },
            ],
            password: ['', Validators.required],
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Unlock
     */
    unlock() {
        // Return if the form is invalid
        if (this.unlockSessionForm.invalid) {
            return;
        }
        // Disable the form
        this.unlockSessionForm.disable();
        // Hide the alert
        this.showAlert = false;
        this._authService.unlockSession({
            email: this._email ?? '',
            password: this.unlockSessionForm.get('password').value,
        }).subscribe(() => {
            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
            // Navigate to the redirect url
            this._router.navigateByUrl(redirectURL);
        }, (response) => {
            // Re-enable the form
            this.unlockSessionForm.enable();
            // Reset the form
            this.unlockSessionNgForm.resetForm({
                name: {
                    value: this.name,
                    disabled: true,
                },
            });
            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Invalid password',
            };
            // Show the alert
            this.showAlert = true;
        });
    }
};
__decorate([
    ViewChild('unlockSessionNgForm')
], AuthUnlockSessionComponent.prototype, "unlockSessionNgForm", void 0);
AuthUnlockSessionComponent = __decorate([
    Component({
        selector: 'auth-unlock-session',
        templateUrl: './unlock-session.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        standalone: true,
        imports: [NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
    })
], AuthUnlockSessionComponent);
export { AuthUnlockSessionComponent };
//# sourceMappingURL=unlock-session.component.js.map