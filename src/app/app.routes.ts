import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AppComponent } from './app.component';
import { LandingHomeComponent } from './modules/landing/home/home.component';
import { LandingComponent } from './modules/landing/landing.component';
import { RoleGuard } from './core/auth/guards/role.guard.spec';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
	// Redirect empty path to '/example'
	{ path: '', component: LandingComponent },

	{ path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },
	{ path: 'unauthorized', component:UnauthorizedComponent},

	// Auth routes for guests
	{
		path: '',
		canActivate: [ NoAuthGuard ],
		canActivateChild: [ NoAuthGuard ],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{
				path: 'confirmation-required',
				loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')
			},
			{
				path: 'forgot-password',
				loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')
			},
			{
				path: 'reset-password',
				loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')
			},
			{ path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
			{ path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') }
		]
	},

	// Auth routes for authenticated users
	{
		path: '',
		canActivate: [ AuthGuard ],
		canActivateChild: [ AuthGuard ],
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [
			{ path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') },
			{
				path: 'unlock-session',
				loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')
			}
		]
	},

	// Landing routes
	{
		path: '',
		component: LayoutComponent,
		data: {
			layout: 'empty'
		},
		children: [ { path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes') } ]
	},

	// users routes
	{
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
		path: '',

		children: [ { path: 'user', loadChildren: () => import('app/modules/user/user.routes') } ]
	},

	// Admin routes


    {
        path: 'admin',
        canActivate: [AuthGuard,RoleGuard],
        canActivateChild: [AuthGuard,RoleGuard],
        data: { roles: ['admin'] },
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
            children: [ { path: '', loadChildren: () => import('app/modules/admin/admin.routes') } ]
    }
,






];


