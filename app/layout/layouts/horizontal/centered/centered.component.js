import { __decorate } from "tslib";
import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from "../../../../../@fuse/components/fullscreen";
import { FuseLoadingBarComponent } from "../../../../../@fuse/components/loading-bar";
import { FuseHorizontalNavigationComponent, FuseVerticalNavigationComponent } from "../../../../../@fuse/components/navigation";
import { LanguagesComponent } from "../../../common/languages/languages.component";
import { MessagesComponent } from "../../../common/messages/messages.component";
import { NotificationsComponent } from "../../../common/notifications/notifications.component";
import { SearchComponent } from "../../../common/search/search.component";
import { ShortcutsComponent } from "../../../common/shortcuts/shortcuts.component";
import { UserComponent } from "../../../common/user/user.component";
import { Subject, takeUntil } from 'rxjs';
let CenteredLayoutComponent = class CenteredLayoutComponent {
    /**
     * Constructor
     */
    constructor(_activatedRoute, _router, _navigationService, _fuseMediaWatcherService, _fuseNavigationService) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._navigationService = _navigationService;
        this._fuseMediaWatcherService = _fuseMediaWatcherService;
        this._fuseNavigationService = _fuseNavigationService;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Getter for current year
     */
    get currentYear() {
        return new Date().getFullYear();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation) => {
            this.navigation = navigation;
        });
        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
            // Check if the screen is small
            this.isScreenSmall = !matchingAliases.includes('md');
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name) {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent(name);
        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
};
CenteredLayoutComponent = __decorate([
    Component({
        selector: 'centered-layout',
        templateUrl: './centered.component.html',
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [FuseLoadingBarComponent, NgIf, FuseVerticalNavigationComponent, FuseHorizontalNavigationComponent, MatButtonModule, MatIconModule, LanguagesComponent, FuseFullscreenComponent, SearchComponent, ShortcutsComponent, MessagesComponent, NotificationsComponent, UserComponent, RouterOutlet],
    })
], CenteredLayoutComponent);
export { CenteredLayoutComponent };
//# sourceMappingURL=centered.component.js.map