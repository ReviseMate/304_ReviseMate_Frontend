import { inject } from '@angular/core';
import { FuseLoadingService } from "./loading.service";
import { finalize, take } from 'rxjs';
export const fuseLoadingInterceptor = (req, next) => {
    const fuseLoadingService = inject(FuseLoadingService);
    let handleRequestsAutomatically = false;
    fuseLoadingService.auto$
        .pipe(take(1))
        .subscribe((value) => {
        handleRequestsAutomatically = value;
    });
    // If the Auto mode is turned off, do nothing
    if (!handleRequestsAutomatically) {
        return next(req);
    }
    // Set the loading status to true
    fuseLoadingService._setLoadingStatus(true, req.url);
    return next(req).pipe(finalize(() => {
        // Set the status to false if there are any errors or the request is completed
        fuseLoadingService._setLoadingStatus(false, req.url);
    }));
};
//# sourceMappingURL=loading.interceptor.js.map