import { __decorate, __param } from "tslib";
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Inject, Input, Output, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { fuseAnimations } from "../../../animations";
import { FuseVerticalNavigationAsideItemComponent } from "./components/aside/aside.component";
import { FuseVerticalNavigationBasicItemComponent } from "./components/basic/basic.component";
import { FuseVerticalNavigationCollapsableItemComponent } from "./components/collapsable/collapsable.component";
import { FuseVerticalNavigationDividerItemComponent } from "./components/divider/divider.component";
import { FuseVerticalNavigationGroupItemComponent } from "./components/group/group.component";
import { FuseVerticalNavigationSpacerItemComponent } from "./components/spacer/spacer.component";
import { FuseScrollbarDirective } from "../../../directives/scrollbar/scrollbar.directive";
import { delay, filter, merge, ReplaySubject, Subject, takeUntil } from 'rxjs';
let FuseVerticalNavigationComponent = class FuseVerticalNavigationComponent {
    /**
     * Constructor
     */
    constructor(_animationBuilder, _changeDetectorRef, _document, _elementRef, _renderer2, _router, _scrollStrategyOptions, _fuseNavigationService, _fuseUtilsService) {
        this._animationBuilder = _animationBuilder;
        this._changeDetectorRef = _changeDetectorRef;
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer2 = _renderer2;
        this._router = _router;
        this._scrollStrategyOptions = _scrollStrategyOptions;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseUtilsService = _fuseUtilsService;
        /* eslint-enable @typescript-eslint/naming-convention */
        this.appearance = 'default';
        this.autoCollapse = true;
        this.inner = false;
        this.mode = 'side';
        this.name = this._fuseUtilsService.randomId();
        this.opened = true;
        this.position = 'left';
        this.transparentOverlay = false;
        this.appearanceChanged = new EventEmitter();
        this.modeChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.positionChanged = new EventEmitter();
        this.activeAsideItemId = null;
        this.onCollapsableItemCollapsed = new ReplaySubject(1);
        this.onCollapsableItemExpanded = new ReplaySubject(1);
        this.onRefreshed = new ReplaySubject(1);
        this._animationsEnabled = false;
        this._hovered = false;
        this._scrollStrategy = this._scrollStrategyOptions.block();
        this._unsubscribeAll = new Subject();
        this._handleAsideOverlayClick = () => {
            this.closeAside();
        };
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
            'fuse-vertical-navigation-animations-enabled': this._animationsEnabled,
            [`fuse-vertical-navigation-appearance-${this.appearance}`]: true,
            'fuse-vertical-navigation-hover': this._hovered,
            'fuse-vertical-navigation-inner': this.inner,
            'fuse-vertical-navigation-mode-over': this.mode === 'over',
            'fuse-vertical-navigation-mode-side': this.mode === 'side',
            'fuse-vertical-navigation-opened': this.opened,
            'fuse-vertical-navigation-position-left': this.position === 'left',
            'fuse-vertical-navigation-position-right': this.position === 'right',
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
    /**
     * Setter for fuseScrollbarDirectives
     */
    set fuseScrollbarDirectives(fuseScrollbarDirectives) {
        // Store the directives
        this._fuseScrollbarDirectives = fuseScrollbarDirectives;
        // Return if there are no directives
        if (fuseScrollbarDirectives.length === 0) {
            return;
        }
        // Unsubscribe the previous subscriptions
        if (this._fuseScrollbarDirectivesSubscription) {
            this._fuseScrollbarDirectivesSubscription.unsubscribe();
        }
        // Update the scrollbars on collapsable items' collapse/expand
        this._fuseScrollbarDirectivesSubscription =
            merge(this.onCollapsableItemCollapsed, this.onCollapsableItemExpanded)
                .pipe(takeUntil(this._unsubscribeAll), delay(250))
                .subscribe(() => {
                // Loop through the scrollbars and update them
                fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {
                    fuseScrollbarDirective.update();
                });
            });
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
        // Appearance
        if ('appearance' in changes) {
            // Execute the observable
            this.appearanceChanged.next(changes.appearance.currentValue);
        }
        // Inner
        if ('inner' in changes) {
            // Coerce the value to a boolean
            this.inner = coerceBooleanProperty(changes.inner.currentValue);
        }
        // Mode
        if ('mode' in changes) {
            // Get the previous and current values
            const currentMode = changes.mode.currentValue;
            const previousMode = changes.mode.previousValue;
            // Disable the animations
            this._disableAnimations();
            // If the mode changes: 'over -> side'
            if (previousMode === 'over' && currentMode === 'side') {
                // Hide the overlay
                this._hideOverlay();
            }
            // If the mode changes: 'side -> over'
            if (previousMode === 'side' && currentMode === 'over') {
                // Close the aside
                this.closeAside();
                // If the navigation is opened
                if (this.opened) {
                    // Show the overlay
                    this._showOverlay();
                }
            }
            // Execute the observable
            this.modeChanged.next(currentMode);
            // Enable the animations after a delay
            // The delay must be bigger than the current transition-duration
            // to make sure nothing will be animated while the mode changing
            setTimeout(() => {
                this._enableAnimations();
            }, 500);
        }
        // Navigation
        if ('navigation' in changes) {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
        // Opened
        if ('opened' in changes) {
            // Coerce the value to a boolean
            this.opened = coerceBooleanProperty(changes.opened.currentValue);
            // Open/close the navigation
            this._toggleOpened(this.opened);
        }
        // Position
        if ('position' in changes) {
            // Execute the observable
            this.positionChanged.next(changes.position.currentValue);
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
        // Make sure the name input is not an empty string
        if (this.name === '') {
            this.name = this._fuseUtilsService.randomId();
        }
        // Register the navigation component
        this._fuseNavigationService.registerComponent(this.name, this);
        // Subscribe to the 'NavigationEnd' event
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // If the mode is 'over' and the navigation is opened...
            if (this.mode === 'over' && this.opened) {
                // Close the navigation
                this.close();
            }
            // If the mode is 'side' and the aside is active...
            if (this.mode === 'side' && this.activeAsideItemId) {
                // Close the aside
                this.closeAside();
            }
        });
    }
    /**
     * After view init
     */
    ngAfterViewInit() {
        // Fix for Firefox.
        //
        // Because 'position: sticky' doesn't work correctly inside a 'position: fixed' parent,
        // adding the '.cdk-global-scrollblock' to the html element breaks the navigation's position.
        // This fixes the problem by reading the 'top' value from the html element and adding it as a
        // 'marginTop' to the navigation itself.
        this._mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const mutationTarget = mutation.target;
                if (mutation.attributeName === 'class') {
                    if (mutationTarget.classList.contains('cdk-global-scrollblock')) {
                        const top = parseInt(mutationTarget.style.top, 10);
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', `${Math.abs(top)}px`);
                    }
                    else {
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', null);
                    }
                }
            });
        });
        this._mutationObserver.observe(this._document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        setTimeout(() => {
            // Return if 'navigation content' element does not exist
            if (!this._navigationContentEl) {
                return;
            }
            // If 'navigation content' element doesn't have
            // perfect scrollbar activated on it...
            if (!this._navigationContentEl.nativeElement.classList.contains('ps')) {
                // Find the active item
                const activeItem = this._navigationContentEl.nativeElement.querySelector('.fuse-vertical-navigation-item-active');
                // If the active item exists, scroll it into view
                if (activeItem) {
                    activeItem.scrollIntoView();
                }
            }
            // Otherwise
            else {
                // Go through all the scrollbar directives
                this._fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {
                    // Skip if not enabled
                    if (!fuseScrollbarDirective.isEnabled()) {
                        return;
                    }
                    // Scroll to the active element
                    fuseScrollbarDirective.scrollToElement('.fuse-vertical-navigation-item-active', -120, true);
                });
            }
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Disconnect the mutation observer
        this._mutationObserver.disconnect();
        // Forcefully close the navigation and aside in case they are opened
        this.close();
        this.closeAside();
        // Deregister the navigation component from the registry
        this._fuseNavigationService.deregisterComponent(this.name);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Refresh the component to apply the changes
     */
    refresh() {
        // Mark for check
        this._changeDetectorRef.markForCheck();
        // Execute the observable
        this.onRefreshed.next(true);
    }
    /**
     * Open the navigation
     */
    open() {
        // Return if the navigation is already open
        if (this.opened) {
            return;
        }
        // Set the opened
        this._toggleOpened(true);
    }
    /**
     * Close the navigation
     */
    close() {
        // Return if the navigation is already closed
        if (!this.opened) {
            return;
        }
        // Close the aside
        this.closeAside();
        // Set the opened
        this._toggleOpened(false);
    }
    /**
     * Toggle the navigation
     */
    toggle() {
        // Toggle
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Open the aside
     *
     * @param item
     */
    openAside(item) {
        // Return if the item is disabled
        if (item.disabled || !item.id) {
            return;
        }
        // Open
        this.activeAsideItemId = item.id;
        // Show the aside overlay
        this._showAsideOverlay();
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Close the aside
     */
    closeAside() {
        // Close
        this.activeAsideItemId = null;
        // Hide the aside overlay
        this._hideAsideOverlay();
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Toggle the aside
     *
     * @param item
     */
    toggleAside(item) {
        // Toggle
        if (this.activeAsideItemId === item.id) {
            this.closeAside();
        }
        else {
            this.openAside(item);
        }
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
     * Show the overlay
     *
     * @private
     */
    _showOverlay() {
        // Return if there is already an overlay
        if (this._asideOverlay) {
            return;
        }
        // Create the overlay element
        this._overlay = this._renderer2.createElement('div');
        // Add a class to the overlay element
        this._overlay.classList.add('fuse-vertical-navigation-overlay');
        // Add a class depending on the transparentOverlay option
        if (this.transparentOverlay) {
            this._overlay.classList.add('fuse-vertical-navigation-overlay-transparent');
        }
        // Append the overlay to the parent of the navigation
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);
        // Enable block scroll strategy
        this._scrollStrategy.enable();
        // Create the enter animation and attach it to the player
        this._player = this._animationBuilder.build([
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 })),
        ]).create(this._overlay);
        // Play the animation
        this._player.play();
        // Add an event listener to the overlay
        this._overlay.addEventListener('click', this._handleOverlayClick);
    }
    /**
     * Hide the overlay
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
            // Disable block scroll strategy
            this._scrollStrategy.disable();
        });
    }
    /**
     * Show the aside overlay
     *
     * @private
     */
    _showAsideOverlay() {
        // Return if there is already an overlay
        if (this._asideOverlay) {
            return;
        }
        // Create the aside overlay element
        this._asideOverlay = this._renderer2.createElement('div');
        // Add a class to the aside overlay element
        this._asideOverlay.classList.add('fuse-vertical-navigation-aside-overlay');
        // Append the aside overlay to the parent of the navigation
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._asideOverlay);
        // Create the enter animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1 })),
            ]).create(this._asideOverlay);
        // Play the animation
        this._player.play();
        // Add an event listener to the aside overlay
        this._asideOverlay.addEventListener('click', this._handleAsideOverlayClick);
    }
    /**
     * Hide the aside overlay
     *
     * @private
     */
    _hideAsideOverlay() {
        if (!this._asideOverlay) {
            return;
        }
        // Create the leave animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 0 })),
            ]).create(this._asideOverlay);
        // Play the animation
        this._player.play();
        // Once the animation is done...
        this._player.onDone(() => {
            // If the aside overlay still exists...
            if (this._asideOverlay) {
                // Remove the event listener
                this._asideOverlay.removeEventListener('click', this._handleAsideOverlayClick);
                // Remove the aside overlay
                this._asideOverlay.parentNode.removeChild(this._asideOverlay);
                this._asideOverlay = null;
            }
        });
    }
    /**
     * Open/close the navigation
     *
     * @param open
     * @private
     */
    _toggleOpened(open) {
        // Set the opened
        this.opened = open;
        // Enable the animations
        this._enableAnimations();
        // If the navigation opened, and the mode
        // is 'over', show the overlay
        if (this.mode === 'over') {
            if (this.opened) {
                this._showOverlay();
            }
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
], FuseVerticalNavigationComponent.prototype, "appearance", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "autoCollapse", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "inner", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "mode", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "name", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "navigation", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "opened", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "position", void 0);
__decorate([
    Input()
], FuseVerticalNavigationComponent.prototype, "transparentOverlay", void 0);
__decorate([
    Output()
], FuseVerticalNavigationComponent.prototype, "appearanceChanged", void 0);
__decorate([
    Output()
], FuseVerticalNavigationComponent.prototype, "modeChanged", void 0);
__decorate([
    Output()
], FuseVerticalNavigationComponent.prototype, "openedChanged", void 0);
__decorate([
    Output()
], FuseVerticalNavigationComponent.prototype, "positionChanged", void 0);
__decorate([
    ViewChild('navigationContent')
], FuseVerticalNavigationComponent.prototype, "_navigationContentEl", void 0);
__decorate([
    HostBinding('class')
], FuseVerticalNavigationComponent.prototype, "classList", null);
__decorate([
    HostBinding('style')
], FuseVerticalNavigationComponent.prototype, "styleList", null);
__decorate([
    ViewChildren(FuseScrollbarDirective)
], FuseVerticalNavigationComponent.prototype, "fuseScrollbarDirectives", null);
__decorate([
    HostListener('mouseenter')
], FuseVerticalNavigationComponent.prototype, "_onMouseenter", null);
__decorate([
    HostListener('mouseleave')
], FuseVerticalNavigationComponent.prototype, "_onMouseleave", null);
FuseVerticalNavigationComponent = __decorate([
    Component({
        selector: 'fuse-vertical-navigation',
        templateUrl: './vertical.component.html',
        styleUrls: ['./vertical.component.scss'],
        animations: fuseAnimations,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'fuseVerticalNavigation',
        standalone: true,
        imports: [FuseScrollbarDirective, CommonModule, NgFor, NgIf, FuseVerticalNavigationAsideItemComponent, FuseVerticalNavigationBasicItemComponent, FuseVerticalNavigationCollapsableItemComponent, FuseVerticalNavigationDividerItemComponent, FuseVerticalNavigationGroupItemComponent, FuseVerticalNavigationSpacerItemComponent],
    }),
    __param(2, Inject(DOCUMENT))
], FuseVerticalNavigationComponent);
export { FuseVerticalNavigationComponent };
//# sourceMappingURL=vertical.component.js.map