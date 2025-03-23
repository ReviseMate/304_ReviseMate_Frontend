import { __decorate } from "tslib";
import { NgIf } from '@angular/common';
import { Component, HostListener, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from "../../../../../@fuse/components/fullscreen";
import { FuseLoadingBarComponent } from "../../../../../@fuse/components/loading-bar";
import { FuseVerticalNavigationComponent } from "../../../../../@fuse/components/navigation";
import { LanguagesComponent } from "../../../common/languages/languages.component";
import { MessagesComponent } from "../../../common/messages/messages.component";
import { NotificationsComponent } from "../../../common/notifications/notifications.component";
import { QuickChatComponent } from "../../../common/quick-chat/quick-chat.component";
import { SearchComponent } from "../../../common/search/search.component";
import { ShortcutsComponent } from "../../../common/shortcuts/shortcuts.component";
import { UserComponent } from "../../../common/user/user.component";
import { Subject, takeUntil } from 'rxjs';
let DenseLayoutComponent = class DenseLayoutComponent {
    /**
     * Constructor
     */
    constructor(_activatedRoute, _router, _navigationService, _fuseMediaWatcherService, _fuseNavigationService) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._navigationService = _navigationService;
        this._fuseMediaWatcherService = _fuseMediaWatcherService;
        this._fuseNavigationService = _fuseNavigationService;
        this.isShowen = false;
        this.navigationAppearance = 'dense';
        this.router = inject(Router);
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
            // Change the navigation appearance
            this.navigationAppearance = this.isScreenSmall ? 'default' : 'dense';
        });
    }
    profileOptions(event) {
        event.stopPropagation(); // Prevents the event from propagating to the document
        this.isShowen = !this.isShowen;
    }
    onClickOutside(event) {
        // Close the dropdown if the click is outside of it
        if (this.isShowen) {
            this.isShowen = false;
        }
    }
    logout() {
        // localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/']);
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
    /**
     * Toggle the navigation appearance
     */
    toggleNavigationAppearance() {
        this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
    }
};
__decorate([
    HostListener('document:click', ['$event'])
], DenseLayoutComponent.prototype, "onClickOutside", null);
DenseLayoutComponent = __decorate([
    Component({
        selector: 'dense-layout',
        templateUrl: './dense.component.html',
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [FuseLoadingBarComponent, FuseVerticalNavigationComponent, MatButtonModule, MatIconModule, LanguagesComponent, FuseFullscreenComponent, SearchComponent, ShortcutsComponent, MessagesComponent, NotificationsComponent, UserComponent, NgIf, RouterOutlet, QuickChatComponent],
    })
], DenseLayoutComponent);
export { DenseLayoutComponent };
//# sourceMappingURL=dense.component.js.map