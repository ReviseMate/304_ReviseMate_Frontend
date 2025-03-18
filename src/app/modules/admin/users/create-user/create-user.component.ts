import { AuthService } from './../../../../core/auth/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { Role } from 'app/models/Role';
import { UowService } from 'app/services/uow.service';
import { MatModule } from 'app/mat.modules';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
    id: any = 0;
    isProf:boolean=false;
    myForm: FormGroup;
    roles: Role[] = []
    user: User = new User(); // Initialize the user object

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private authService: AuthService,

       private uow:UowService

    ) { }

    ngOnInit(): void {
        this.uow.roles.getAll().subscribe((res:any) => {
            this.roles = res;
        })
        this.createForm(); // Create the form after the user data is available

    }


    createForm() {
        this.myForm = this.fb.group({
            id: [this.user.id],
            nom: [this.user.firstName,[Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']+$")]],
            prenom: [this.user.lastName,[Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ']+$")]],
            email: [this.user.email,[Validators.required, Validators.email]],
            password: [this.user.password,[ Validators.minLength(8),Validators.required]],
            idRole: [this.user.id_role,Validators.required],
        });
    }



    delete() {
        this.userService.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/profs']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    submit(user: User) {

        this.uow.users.put(this.user.id, user).subscribe((res:any) => {
              if(res.code===1){
                  this.router.navigate(['/admin/users']);

              }
        })
    }
}
