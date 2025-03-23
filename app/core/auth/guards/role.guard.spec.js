import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
export const RoleGuard = (route, state) => {
    const router = inject(Router);
    const userRole = localStorage.getItem('role'); // Récupère le rôle depuis localStorage
    const allowedRoles = route.data?.['roles'] || [];
    if (userRole && allowedRoles.includes(userRole)) {
        return of(true);
    }
    else {
        const urlTree = router.parseUrl('/unauthorized');
        return of(urlTree);
    }
};
//# sourceMappingURL=role.guard.spec.js.map