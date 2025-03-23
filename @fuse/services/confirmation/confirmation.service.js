import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationDialogComponent } from "./dialog/dialog.component";
import { merge } from 'lodash-es';
let FuseConfirmationService = class FuseConfirmationService {
    /**
     * Constructor
     */
    constructor() {
        this._matDialog = inject(MatDialog);
        this._defaultConfig = {
            title: 'Confirm action',
            message: 'Are you sure you want to confirm this action?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation-triangle',
                color: 'warn',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirm',
                    color: 'warn',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: false,
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    open(config = {}) {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);
        // Open the dialog
        return this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
};
FuseConfirmationService = __decorate([
    Injectable({ providedIn: 'root' })
], FuseConfirmationService);
export { FuseConfirmationService };
//# sourceMappingURL=confirmation.service.js.map