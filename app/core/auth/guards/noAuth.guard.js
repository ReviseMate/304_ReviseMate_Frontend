import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { of, switchMap } from 'rxjs';
export const NoAuthGuard = (route, state) => {
    const router = inject(Router);
    // Check the authentication status
    return inject(AuthService).check().pipe(switchMap((authenticated) => {
        // If the user is authenticated...
        if (authenticated) {
            return of(router.parseUrl(''));
        }
        // Allow the access
        return of(true);
    }));
};
//# sourceMappingURL=noAuth.guard.js.map