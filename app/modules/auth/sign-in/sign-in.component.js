import { __decorate } from "tslib";
import { NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from "../../../../@fuse/animations";
import { FuseAlertComponent } from "../../../../@fuse/components/alert";
let AuthSignInComponent = class AuthSignInComponent {
    /**
     * Constructor
     */
    constructor(_activatedRoute, _authService, _formBuilder, _router) {
        this._activatedRoute = _activatedRoute;
        this._authService = _authService;
        this._formBuilder = _formBuilder;
        this._router = _router;
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
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Sign in
     */
    signIn() {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }
        // Disable the form
        this.signInForm.disable();
        // Hide the alert
        this.showAlert = false;
        // Sign in
        this._authService.login(this.signInForm.value)
            .subscribe((res) => {
            if (res.message == "Connexion réussie") {
                const userData = JSON.stringify(res.user);
                localStorage.setItem('user', userData);
                localStorage.setItem('role', res.user.role);
                this._router.navigateByUrl('/user');
            }
            else {
                // Re-enable the form
                this.signInForm.enable();
                // Reset the form
                this.signInNgForm.resetForm();
                // Set the alert
                this.alert = {
                    type: 'error',
                    message: res.message,
                };
                // Show the alert
                this.showAlert = true;
            }
        });
    }
};
__decorate([
    ViewChild('signInNgForm')
], AuthSignInComponent.prototype, "signInNgForm", void 0);
AuthSignInComponent = __decorate([
    Component({
        selector: 'auth-sign-in',
        templateUrl: './sign-in.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        standalone: true,
        imports: [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
    })
], AuthSignInComponent);
export { AuthSignInComponent };
//# sourceMappingURL=sign-in.component.js.map