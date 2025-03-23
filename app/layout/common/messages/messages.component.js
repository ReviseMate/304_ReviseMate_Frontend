import { __decorate } from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
let MessagesComponent = class MessagesComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _messagesService, _overlay, _viewContainerRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._messagesService = _messagesService;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this.unreadCount = 0;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to message changes
        this._messagesService.messages$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((messages) => {
            // Load the messages
            this.messages = messages;
            // Calculate the unread count
            this._calculateUnreadCount();
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
     * Open the messages panel
     */
    openPanel() {
        // Return if the messages panel or its origin is not defined
        if (!this._messagesPanel || !this._messagesOrigin) {
            return;
        }
        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }
        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._messagesPanel, this._viewContainerRef));
    }
    /**
     * Close the messages panel
     */
    closePanel() {
        this._overlayRef.detach();
    }
    /**
     * Mark all messages as read
     */
    markAllAsRead() {
        // Mark all as read
        this._messagesService.markAllAsRead().subscribe();
    }
    /**
     * Toggle read status of the given message
     */
    toggleRead(message) {
        // Toggle the read status
        message.read = !message.read;
        // Update the message
        this._messagesService.update(message.id, message).subscribe();
    }
    /**
     * Delete the given message
     */
    delete(message) {
        // Delete the message
        this._messagesService.delete(message.id).subscribe();
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
                .flexibleConnectedTo(this._messagesOrigin._elementRef.nativeElement)
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
    /**
     * Calculate the unread count
     *
     * @private
     */
    _calculateUnreadCount() {
        let count = 0;
        if (this.messages && this.messages.length) {
            count = this.messages.filter(message => !message.read).length;
        }
        this.unreadCount = count;
    }
};
__decorate([
    ViewChild('messagesOrigin')
], MessagesComponent.prototype, "_messagesOrigin", void 0);
__decorate([
    ViewChild('messagesPanel')
], MessagesComponent.prototype, "_messagesPanel", void 0);
MessagesComponent = __decorate([
    Component({
        selector: 'messages',
        templateUrl: './messages.component.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'messages',
        standalone: true,
        imports: [MatButtonModule, NgIf, MatIconModule, MatTooltipModule, NgFor, NgClass, NgTemplateOutlet, RouterLink, DatePipe],
    })
], MessagesComponent);
export { MessagesComponent };
//# sourceMappingURL=messages.component.js.map