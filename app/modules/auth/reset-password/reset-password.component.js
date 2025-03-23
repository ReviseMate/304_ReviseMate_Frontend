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
import { FuseValidators } from "../../../../@fuse/validators";
import { finalize } from 'rxjs';
let AuthResetPasswordComponent = class AuthResetPasswordComponent {
    /**
     * Constructor
     */
    constructor(_authService, _formBuilder) {
        this._authService = _authService;
        this._formBuilder = _formBuilder;
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
        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        }, {
            validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Reset password
     */
    resetPassword() {
        // Return if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }
        // Disable the form
        this.resetPasswordForm.disable();
        // Hide the alert
        this.showAlert = false;
        // Send the request to the server
        this._authService.resetPassword(this.resetPasswordForm.get('password').value)
            .pipe(finalize(() => {
            // Re-enable the form
            this.resetPasswordForm.enable();
            // Reset the form
            this.resetPasswordNgForm.resetForm();
            // Show the alert
            this.showAlert = true;
        }))
            .subscribe((response) => {
            // Set the alert
            this.alert = {
                type: 'success',
                message: 'Your password has been reset.',
            };
        }, (response) => {
            // Set the alert
            this.alert = {
                type: 'error',
                message: 'Something went wrong, please try again.',
            };
        });
    }
};
__decorate([
    ViewChild('resetPasswordNgForm')
], AuthResetPasswordComponent.prototype, "resetPasswordNgForm", void 0);
AuthResetPasswordComponent = __decorate([
    Component({
        selector: 'auth-reset-password',
        templateUrl: './reset-password.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        standalone: true,
        imports: [NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
    })
], AuthResetPasswordComponent);
export { AuthResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map