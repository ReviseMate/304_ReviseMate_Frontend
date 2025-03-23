import { __decorate } from "tslib";
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
let FuseDrawerComponent = class FuseDrawerComponent {
    /**
     * Constructor
     */
    constructor(_animationBuilder, _elementRef, _renderer2, _fuseDrawerService, _fuseUtilsService) {
        this._animationBuilder = _animationBuilder;
        this._elementRef = _elementRef;
        this._renderer2 = _renderer2;
        this._fuseDrawerService = _fuseDrawerService;
        this._fuseUtilsService = _fuseUtilsService;
        /* eslint-enable @typescript-eslint/naming-convention */
        this.fixed = false;
        this.mode = 'side';
        this.name = this._fuseUtilsService.randomId();
        this.opened = false;
        this.position = 'left';
        this.transparentOverlay = false;
        this.fixedChanged = new EventEmitter();
        this.modeChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.positionChanged = new EventEmitter();
        this._animationsEnabled = false;
        this._hovered = false;
        this._handleOverlayClick = () => {
            this.close();
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Host binding for component classes
     */
    get classList() {
        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            'fuse-drawer-animations-enabled': this._animationsEnabled,
            'fuse-drawer-fixed': this.fixed,
            'fuse-drawer-hover': this._hovered,
            [`fuse-drawer-mode-${this.mode}`]: true,
            'fuse-drawer-opened': this.opened,
            [`fuse-drawer-position-${this.position}`]: true,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }
    /**
     * Host binding for component inline styles
     */
    get styleList() {
        return {
            'visibility': this.opened ? 'visible' : 'hidden',
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On mouseenter
     *
     * @private
     */
    _onMouseenter() {
        // Enable the animations
        this._enableAnimations();
        // Set the hovered
        this._hovered = true;
    }
    /**
     * On mouseleave
     *
     * @private
     */
    _onMouseleave() {
        // Enable the animations
        this._enableAnimations();
        // Set the hovered
        this._hovered = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes) {
        // Fixed
        if ('fixed' in changes) {
            // Coerce the value to a boolean
            this.fixed = coerceBooleanProperty(changes.fixed.currentValue);
            // Execute the observable
            this.fixedChanged.next(this.fixed);
        }
        // Mode
        if ('mode' in changes) {
            // Get the previous and current values
            const previousMode = changes.mode.previousValue;
            const currentMode = changes.mode.currentValue;
            // Disable the animations
            this._disableAnimations();
            // If the mode changes: 'over -> side'
            if (previousMode === 'over' && currentMode === 'side') {
                // Hide the overlay
                this._hideOverlay();
            }
            // If the mode changes: 'side -> over'
            if (previousMode === 'side' && currentMode === 'over') {
                // If the drawer is opened
                if (this.opened) {
                    // Show the overlay
                    this._showOverlay();
                }
            }
            // Execute the observable
            this.modeChanged.next(currentMode);
            // Enable the animations after a delay
            // The delay must be bigger than the current transition-duration
            // to make sure nothing will be animated while the mode is changing
            setTimeout(() => {
                this._enableAnimations();
            }, 500);
        }
        // Opened
        if ('opened' in changes) {
            // Coerce the value to a boolean
            const open = coerceBooleanProperty(changes.opened.currentValue);
            // Open/close the drawer
            this._toggleOpened(open);
        }
        // Position
        if ('position' in changes) {
            // Execute the observable
            this.positionChanged.next(this.position);
        }
        // Transparent overlay
        if ('transparentOverlay' in changes) {
            // Coerce the value to a boolean
            this.transparentOverlay = coerceBooleanProperty(changes.transparentOverlay.currentValue);
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Register the drawer
        this._fuseDrawerService.registerComponent(this.name, this);
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Finish the animation
        if (this._player) {
            this._player.finish();
        }
        // Deregister the drawer from the registry
        this._fuseDrawerService.deregisterComponent(this.name);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the drawer
     */
    open() {
        // Return if the drawer has already opened
        if (this.opened) {
            return;
        }
        // Open the drawer
        this._toggleOpened(true);
    }
    /**
     * Close the drawer
     */
    close() {
        // Return if the drawer has already closed
        if (!this.opened) {
            return;
        }
        // Close the drawer
        this._toggleOpened(false);
    }
    /**
     * Toggle the drawer
     */
    toggle() {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Enable the animations
     *
     * @private
     */
    _enableAnimations() {
        // Return if the animations are already enabled
        if (this._animationsEnabled) {
            return;
        }
        // Enable the animations
        this._animationsEnabled = true;
    }
    /**
     * Disable the animations
     *
     * @private
     */
    _disableAnimations() {
        // Return if the animations are already disabled
        if (!this._animationsEnabled) {
            return;
        }
        // Disable the animations
        this._animationsEnabled = false;
    }
    /**
     * Show the backdrop
     *
     * @private
     */
    _showOverlay() {
        // Create the backdrop element
        this._overlay = this._renderer2.createElement('div');
        // Add a class to the backdrop element
        this._overlay.classList.add('fuse-drawer-overlay');
        // Add a class depending on the fixed option
        if (this.fixed) {
            this._overlay.classList.add('fuse-drawer-overlay-fixed');
        }
        // Add a class depending on the transparentOverlay option
        if (this.transparentOverlay) {
            this._overlay.classList.add('fuse-drawer-overlay-transparent');
        }
        // Append the backdrop to the parent of the drawer
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);
        // Create enter animation and attach it to the player
        this._player = this._animationBuilder.build([
            style({ opacity: 0 }),
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 })),
        ]).create(this._overlay);
        // Play the animation
        this._player.play();
        // Add an event listener to the overlay
        this._overlay.addEventListener('click', this._handleOverlayClick);
    }
    /**
     * Hide the backdrop
     *
     * @private
     */
    _hideOverlay() {
        if (!this._overlay) {
            return;
        }
        // Create the leave animation and attach it to the player
        this._player = this._animationBuilder.build([
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 0 })),
        ]).create(this._overlay);
        // Play the animation
        this._player.play();
        // Once the animation is done...
        this._player.onDone(() => {
            // If the overlay still exists...
            if (this._overlay) {
                // Remove the event listener
                this._overlay.removeEventListener('click', this._handleOverlayClick);
                // Remove the overlay
                this._overlay.parentNode.removeChild(this._overlay);
                this._overlay = null;
            }
        });
    }
    /**
     * Open/close the drawer
     *
     * @param open
     * @private
     */
    _toggleOpened(open) {
        // Set the opened
        this.opened = open;
        // Enable the animations
        this._enableAnimations();
        // If the mode is 'over'
        if (this.mode === 'over') {
            // If the drawer opens, show the overlay
            if (open) {
                this._showOverlay();
            }
            // Otherwise, close the overlay
            else {
                this._hideOverlay();
            }
        }
        // Execute the observable
        this.openedChanged.next(open);
    }
};
__decorate([
    Input()
], FuseDrawerComponent.prototype, "fixed", void 0);
__decorate([
    Input()
], FuseDrawerComponent.prototype, "mode", void 0);
__decorate([
    Input()
], FuseDrawerComponent.prototype, "name", void 0);
__decorate([
    Input()
], FuseDrawerComponent.prototype, "opened", void 0);
__decorate([
    Input()
], FuseDrawerComponent.prototype, "position", void 0);
__decorate([
    Input()
], FuseDrawerComponent.prototype, "transparentOverlay", void 0);
__decorate([
    Output()
], FuseDrawerComponent.prototype, "fixedChanged", void 0);
__decorate([
    Output()
], FuseDrawerComponent.prototype, "modeChanged", void 0);
__decorate([
    Output()
], FuseDrawerComponent.prototype, "openedChanged", void 0);
__decorate([
    Output()
], FuseDrawerComponent.prototype, "positionChanged", void 0);
__decorate([
    HostBinding('class')
], FuseDrawerComponent.prototype, "classList", null);
__decorate([
    HostBinding('style')
], FuseDrawerComponent.prototype, "styleList", null);
__decorate([
    HostListener('mouseenter')
], FuseDrawerComponent.prototype, "_onMouseenter", null);
__decorate([
    HostListener('mouseleave')
], FuseDrawerComponent.prototype, "_onMouseleave", null);
FuseDrawerComponent = __decorate([
    Component({
        selector: 'fuse-drawer',
        templateUrl: './drawer.component.html',
        styleUrls: ['./drawer.component.scss'],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'fuseDrawer',
        standalone: true,
    })
], FuseDrawerComponent);
export { FuseDrawerComponent };
//# sourceMappingURL=drawer.component.js.map