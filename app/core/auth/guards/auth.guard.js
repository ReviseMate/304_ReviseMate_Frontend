import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { of, switchMap } from 'rxjs';
export const AuthGuard = (route, state) => {
    const router = inject(Router);
    const user = localStorage.getItem('user');
    // Check the authentication status
    return inject(AuthService).check().pipe(switchMap((authenticated) => {
        if (user == null) {
            const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
            const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
            return of(urlTree);
        }
        return of(true);
    }));
};
// Check the authentication status
//# sourceMappingURL=auth.guard.js.map