import { __decorate } from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
let ShortcutsComponent = class ShortcutsComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _formBuilder, _shortcutsService, _overlay, _viewContainerRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._formBuilder = _formBuilder;
        this._shortcutsService = _shortcutsService;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this.mode = 'view';
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Initialize the form
        this.shortcutForm = this._formBuilder.group({
            id: [null],
            label: ['', Validators.required],
            description: [''],
            icon: ['', Validators.required],
            link: ['', Validators.required],
            useRouter: ['', Validators.required],
        });
        // Get the shortcuts
        this._shortcutsService.shortcuts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((shortcuts) => {
            // Load the shortcuts
            this.shortcuts = shortcuts;
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        // Dispose the overlay
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the shortcuts panel
     */
    openPanel() {
        // Return if the shortcuts panel or its origin is not defined
        if (!this._shortcutsPanel || !this._shortcutsOrigin) {
            return;
        }
        // Make sure to start in 'view' mode
        this.mode = 'view';
        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }
        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._shortcutsPanel, this._viewContainerRef));
    }
    /**
     * Close the shortcuts panel
     */
    closePanel() {
        this._overlayRef.detach();
    }
    /**
     * Change the mode
     */
    changeMode(mode) {
        // Change the mode
        this.mode = mode;
    }
    /**
     * Prepare for a new shortcut
     */
    newShortcut() {
        // Reset the form
        this.shortcutForm.reset();
        // Enter the add mode
        this.mode = 'add';
    }
    /**
     * Edit a shortcut
     */
    editShortcut(shortcut) {
        // Reset the form with the shortcut
        this.shortcutForm.reset(shortcut);
        // Enter the edit mode
        this.mode = 'edit';
    }
    /**
     * Save shortcut
     */
    save() {
        // Get the data from the form
        const shortcut = this.shortcutForm.value;
        // If there is an id, update it...
        if (shortcut.id) {
            this._shortcutsService.update(shortcut.id, shortcut).subscribe();
        }
        // Otherwise, create a new shortcut...
        else {
            this._shortcutsService.create(shortcut).subscribe();
        }
        // Go back the modify mode
        this.mode = 'modify';
    }
    /**
     * Delete shortcut
     */
    delete() {
        // Get the data from the form
        const shortcut = this.shortcutForm.value;
        // Delete
        this._shortcutsService.delete(shortcut.id).subscribe();
        // Go back the modify mode
        this.mode = 'modify';
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
     * Create the overlay
     */
    _createOverlay() {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                },
            ]),
        });
        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }
};
__decorate([
    ViewChild('shortcutsOrigin')
], ShortcutsComponent.prototype, "_shortcutsOrigin", void 0);
__decorate([
    ViewChild('shortcutsPanel')
], ShortcutsComponent.prototype, "_shortcutsPanel", void 0);
ShortcutsComponent = __decorate([
    Component({
        selector: 'shortcuts',
        templateUrl: './shortcuts.component.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'shortcuts',
        standalone: true,
        imports: [MatButtonModule, MatIconModule, NgIf, MatTooltipModule, NgFor, NgClass, NgTemplateOutlet, RouterLink, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule],
    })
], ShortcutsComponent);
export { ShortcutsComponent };
//# sourceMappingURL=shortcuts.component.js.map