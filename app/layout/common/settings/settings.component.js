import { __decorate } from "tslib";
import { NgClass, NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from "../../../../@fuse/components/drawer";
import { Subject, takeUntil } from 'rxjs';
let SettingsComponent = class SettingsComponent {
    /**
     * Constructor
     */
    constructor(_router, _fuseConfigService) {
        this._router = _router;
        this._fuseConfigService = _fuseConfigService;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
            // Store the config
            this.config = config;
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
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout) {
        // Clear the 'layout' query param to allow layout changes
        this._router.navigate([], {
            queryParams: {
                layout: null,
            },
            queryParamsHandling: 'merge',
        }).then(() => {
            // Set the config
            this._fuseConfigService.config = { layout };
        });
    }
    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme) {
        this._fuseConfigService.config = { scheme };
    }
    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme) {
        this._fuseConfigService.config = { theme };
    }
};
SettingsComponent = __decorate([
    Component({
        selector: 'settings',
        templateUrl: './settings.component.html',
        styles: [
            `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {

                empty-layout + settings .settings-cog {
                    right: 0 !important;
                }
            }
        `,
        ],
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [MatIconModule, FuseDrawerComponent, MatButtonModule, NgFor, NgClass, MatTooltipModule],
    })
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map