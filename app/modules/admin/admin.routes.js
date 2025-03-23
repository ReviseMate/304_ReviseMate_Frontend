// import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "../user/profile/profile.component";
export default [
    { path: '', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    {
        path: '',
        children: [
            { path: 'users',
                children: [
                    { path: '', loadChildren: () => import('app/modules/admin/users/users.routes') },
                ] },
            { path: 'classes',
                children: [
                    { path: '', loadChildren: () => import('app/modules/admin/classes/classes.routes') },
                ] },
        ]
    }
];
//# sourceMappingURL=admin.routes.js.map