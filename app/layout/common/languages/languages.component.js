import { __decorate } from "tslib";
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { take } from 'rxjs';
let LanguagesComponent = class LanguagesComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _fuseNavigationService, _translocoService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._translocoService = _translocoService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();
        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.activeLang = activeLang;
            // Update the navigation
            this._updateNavigation(activeLang);
        });
        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'us',
            'tr': 'tr',
        };
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang) {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index, item) {
        return item.id || index;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    _updateNavigation(lang) {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.
        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent('mainNavigation');
        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }
        // Get the flat navigation data
        const navigation = navComponent.navigation;
        // Get the Project dashboard item and update its title
        const projectDashboardItem = this._fuseNavigationService.getItem('dashboards.project', navigation);
        if (projectDashboardItem) {
            this._translocoService.selectTranslate('Project').pipe(take(1))
                .subscribe((translation) => {
                // Set the title
                projectDashboardItem.title = translation;
                // Refresh the navigation component
                navComponent.refresh();
            });
        }
        // Get the Analytics dashboard item and update its title
        const analyticsDashboardItem = this._fuseNavigationService.getItem('dashboards.analytics', navigation);
        if (analyticsDashboardItem) {
            this._translocoService.selectTranslate('Analytics').pipe(take(1))
                .subscribe((translation) => {
                // Set the title
                analyticsDashboardItem.title = translation;
                // Refresh the navigation component
                navComponent.refresh();
            });
        }
    }
};
LanguagesComponent = __decorate([
    Component({
        selector: 'languages',
        templateUrl: './languages.component.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'languages',
        standalone: true,
        imports: [MatButtonModule, MatMenuModule, NgTemplateOutlet, NgFor],
    })
], LanguagesComponent);
export { LanguagesComponent };
//# sourceMappingURL=languages.component.js.map