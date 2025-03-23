import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FUSE_MOCK_API_DEFAULT_DELAY, mockApiInterceptor } from "./lib/mock-api";
import { FUSE_CONFIG } from "./services/config/config.constants";
import { FuseConfirmationService } from "./services/confirmation";
import { fuseLoadingInterceptor, FuseLoadingService } from "./services/loading";
import { FuseMediaWatcherService } from "./services/media-watcher";
import { FusePlatformService } from "./services/platform";
import { FuseSplashScreenService } from "./services/splash-screen";
import { FuseUtilsService } from "./services/utils";
/**
 * Fuse provider
 */
export const provideFuse = (config) => {
    // Base providers
    const providers = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: FUSE_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide: FUSE_CONFIG,
            useValue: config?.fuse ?? {},
        },
        importProvidersFrom(MatDialogModule),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseConfirmationService),
            multi: true,
        },
        provideHttpClient(withInterceptors([fuseLoadingInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseLoadingService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseMediaWatcherService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FusePlatformService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseSplashScreenService),
            multi: true,
        },
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(FuseUtilsService),
            multi: true,
        },
    ];
    // Mock Api services
    if (config?.mockApi?.services) {
        providers.push(provideHttpClient(withInterceptors([mockApiInterceptor])), {
            provide: APP_INITIALIZER,
            deps: [...config.mockApi.services],
            useFactory: () => () => null,
            multi: true,
        });
    }
    // Return the providers
    return providers;
};
//# sourceMappingURL=fuse.provider.js.map