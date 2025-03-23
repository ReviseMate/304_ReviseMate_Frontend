import { __decorate, __param } from "tslib";
import { NgClass, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
let FuseConfirmationDialogComponent = class FuseConfirmationDialogComponent {
    /**
     * Constructor
     */
    constructor(data) {
        this.data = data;
    }
};
FuseConfirmationDialogComponent = __decorate([
    Component({
        selector: 'fuse-confirmation-dialog',
        templateUrl: './dialog.component.html',
        styles: [
            `
            .fuse-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
        ],
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass],
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], FuseConfirmationDialogComponent);
export { FuseConfirmationDialogComponent };
//# sourceMappingURL=dialog.component.js.map