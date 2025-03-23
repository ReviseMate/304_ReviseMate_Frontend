import { __decorate } from "tslib";
// Importation des modules nécessaires d'Angular
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
// Importation des animations et composants externes
import { fuseAnimations } from "../../../../@fuse/animations";
import { FuseAlertComponent } from "../../../../@fuse/components/alert";
// Définition du validateur pour la correspondance des mots de passe
export const passwordMatchValidator = (control) => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    return password === confirmPassword ? null : { mismatch: true };
};
let AuthSignUpComponent = class AuthSignUpComponent {
    /**
     * Constructeur du composant
     */
    constructor(_authService, // Service d'authentification
    _formBuilder, // Constructeur de formulaire
    _router, // Service de navigation
    dialog, // Service de gestion des dialogues modaux
    uow // Service pour récupérer les rôles
    ) {
        this._authService = _authService;
        this._formBuilder = _formBuilder;
        this._router = _router;
        this.dialog = dialog;
        this.uow = uow;
        this.passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        // Objet pour gérer l'affichage des alertes
        this.alert = {
            type: 'success',
            message: '',
        };
        // Variables pour la gestion de l'état du formulaire et des rôles
        this.isShow = false;
        this.idProfRole = false;
        this.isChecked = false;
        this.showAlert = false;
        this.showAlertCode = false;
        this.roles = [];
    }
    /**
     * Initialisation du composant
     */
    ngOnInit() {
        // Création du formulaire d'inscription
        this.createForm();
    }
    /**
     * Création et configuration du formulaire d'inscription
     */
    createForm() {
        this.signUpForm = this._formBuilder.group({
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(this.passwordPattern)
                ]],
            confirmPassword: ['', [Validators.required]],
            role: "Étudiant",
            code_prof: null,
        }, { validators: passwordMatchValidator });
    }
    /**
     * Vérification de la correspondance entre le mot de passe et la confirmation
     */
    verify() {
        const user = this.signUpForm.getRawValue();
        this.isShow = user.password !== user.confirmPassword;
    }
    /**
     * Ouverture de la fenêtre modale de sécurité
     */
    openSecurityPoppup() {
        const dialogRef = this.dialog.open(this.securityPoppup, {
            height: '380px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(() => { });
    }
    /**
     * Fermeture de toutes les fenêtres modales ouvertes
     */
    closePoppup() {
        this.dialog.closeAll();
    }
    /**
     * Soumission du code de vérification pour le rôle "Professeur"
     */
    submitCodeProf() {
        this.dialog.closeAll();
        this.signUpForm.patchValue({
            role: "professeur",
        });
    }
    /**
     * Vérification si l'utilisateur est un professeur
     * Ouvre la popup de sécurité si nécessaire
     */
    isProf() {
        if (!this.isChecked) {
            this.openSecurityPoppup();
            this.isChecked = true;
        }
        else {
            this.isChecked = false;
        }
    }
    /**
     * Soumission du formulaire d'inscription
     */
    signUp() {
        // Vérification de la validité du formulaire
        if (this.signUpForm.invalid) {
            // Vérification spécifique pour la correspondance des mots de passe
            if (this.signUpForm.hasError('mismatch')) {
                this.showAlert = true;
                this.alert = {
                    type: 'error',
                    message: 'Les mots de passe ne correspondent pas.',
                };
            }
            return;
        }
        // Désactivation du formulaire pour éviter une double soumission
        this.signUpForm.disable();
        this.showAlert = false;
        console.log(this.signUpForm.value);
        this.signUpForm.patchValue({
            code_prof: this.codeProf,
        });
        // Suppression de la confirmation du mot de passe avant l'envoi
        const { confirmPassword, ...formData } = this.signUpForm.value;
        // Appel du service d'inscription
        this._authService.signUp(formData).subscribe((res) => {
            this.signUpForm.enable();
            // Gestion de la réponse du serveur
            if (res.message === "Inscription réussie") {
                this.showAlert = true;
                this.alert = {
                    type: 'info',
                    message: res.message,
                };
                // Redirection vers la page de connexion
                this._router.navigateByUrl('/sign-in');
            }
            else {
                this.showAlert = true;
                this.alert = {
                    type: 'error',
                    message: res.message,
                };
            }
        });
    }
};
__decorate([
    ViewChild('signUpNgForm')
], AuthSignUpComponent.prototype, "signUpNgForm", void 0);
__decorate([
    ViewChild('securityPoppup')
], AuthSignUpComponent.prototype, "securityPoppup", void 0);
AuthSignUpComponent = __decorate([
    Component({
        selector: 'auth-sign-up',
        templateUrl: './sign-up.component.html',
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        standalone: true,
        imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
    })
], AuthSignUpComponent);
export { AuthSignUpComponent };
//# sourceMappingURL=sign-up.component.js.map