import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from "../../../models/User";
import { MatModule } from "../../../mat.modules";
import { MatSelectModule } from '@angular/material/select';
let ProfileComponent = class ProfileComponent {
    constructor(fb, router, dialog, uow, userUpdateService // Injection du service
    ) {
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.uow = uow;
        this.userUpdateService = userUpdateService;
        this.id = 0;
        this.user = new User();
        this.isProf = false;
        this.commingPwd = '';
        this.poppupMessage = '';
        this.isSuccess = false;
        this.classes = [];
    }
    ngOnInit() {
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1);
            this.id = userStorage.id;
        }
        this.uow.users.getOne(this.id).subscribe((res) => {
            console.log(res);
            if (res.success) {
                this.user = res.data;
                this.commingPwd = res.data.password;
                this.role = this.user.role;
                this.createForm();
            }
            else {
                this.DeletedUserPoppup();
            }
            this.uow.classes.getAll().subscribe((res) => {
                if (res !== null) {
                    this.classes = res.data;
                }
                else {
                    console.log("A problem occurred while fetching data");
                }
            });
        });
    }
    createForm() {
        this.myForm = this.fb.group({
            id: [this.id],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3)]],
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(.{8,})$/)]],
            role: [this.user.role],
            id_classe: [this.user.id_classe],
        });
    }
    update(user) {
        // Vérifiez si le mot de passe a été modifié
        if (user.password === '') {
            // Supprimez le champ password des données envoyées
            delete user.password;
        }
        else {
            // Mettez à jour le mot de passe
            user.password = this.commingPwd;
        }
        // Utilisation du service UserUpdateService pour mettre à jour l'utilisateur
        this.userUpdateService.updateUser(this.id, user).subscribe((res) => {
            console.log('Server response:', res);
            if (res.success) {
                this.poppupMessage = 'Profil mis à jour';
                this.ProfilePoppup();
                this.isSuccess = true;
            }
            else {
                this.poppupMessage = "Profil mis à jour";
                this.ProfilePoppup();
                this.isSuccess = false;
            }
        });
    }
    closePoppup() {
        this.dialog.closeAll();
    }
    ProfilePoppup() {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    DeletedUserPoppup() {
        const dialogRef = this.dialog.open(this.DeletePoppup, {
            height: '300px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
};
__decorate([
    ViewChild('popupTemplate')
], ProfileComponent.prototype, "popupTemplate", void 0);
__decorate([
    ViewChild('DeletePoppup')
], ProfileComponent.prototype, "DeletePoppup", void 0);
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        standalone: true,
        imports: [RouterLink, CommonModule, MatSelectModule,
            FormsModule, ReactiveFormsModule,
            MatModule],
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map