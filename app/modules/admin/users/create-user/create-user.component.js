import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from "../../../../models/User";
import { MatModule } from "../../../../mat.modules";
let CreateUserComponent = class CreateUserComponent {
    constructor(userService, route, fb, router, uow) {
        this.userService = userService;
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.uow = uow;
        this.id = 0;
        this.isProf = false;
        this.roles = [];
        this.user = new User(); // Initialize the user object
    }
    ngOnInit() {
        // this.uow.roles.getAll().subscribe((res:any) => {
        //     this.roles = res;
        // })
        this.createForm(); // Create the form after the user data is available
    }
    createForm() {
        this.myForm = this.fb.group({
            id: [this.user.id],
            firstName: [this.user.firstName, [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']+$")]],
            lastName: [this.user.lastName, [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']+$")]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: [this.user.password, [Validators.minLength(8), Validators.required]],
            role: [this.user.role, Validators.required],
        });
    }
    delete() {
        this.userService.delete(this.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/profs']) : console.error("Error while deleting ");
        });
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }
    submit(user) {
        console.log(user);
        this.uow.users.post(user).subscribe((res) => {
            if (res.message === "Inscription réussie") {
                this.router.navigate(['/admin/users']);
            }
            else {
                console.log("error while creating user");
            }
        });
    }
};
CreateUserComponent = __decorate([
    Component({
        selector: 'app-create-user',
        standalone: true,
        imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
        templateUrl: './create-user.component.html',
        styleUrl: './create-user.component.scss'
    })
], CreateUserComponent);
export { CreateUserComponent };
//# sourceMappingURL=create-user.component.js.map