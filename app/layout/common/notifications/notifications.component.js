import { __decorate } from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
let NotificationsComponent = class NotificationsComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _notificationsService, _overlay, _viewContainerRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._notificationsService = _notificationsService;
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
        // Subscribe to notification changes
        this._notificationsService.notifications$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications) => {
            // Load the notifications
            this.notifications = notifications;
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
     * Open the notifications panel
     */
    openPanel() {
        // Return if the notifications panel or its origin is not defined
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }
        // Create the overlay if it doesn't exist
        if (!this._overlayRef) {
            this._createOverlay();
        }
        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }
    /**
     * Close the notifications panel
     */
    closePanel() {
        this._overlayRef.detach();
    }
    /**
     * Mark all notifications as read
     */
    markAllAsRead() {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }
    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification) {
        // Toggle the read status
        notification.read = !notification.read;
        // Update the notification
        this._notificationsService.update(notification.id, notification).subscribe();
    }
    /**
     * Delete the given notification
     */
    delete(notification) {
        // Delete the notification
        this._notificationsService.delete(notification.id).subscribe();
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
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
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
        if (this.notifications && this.notifications.length) {
            count = this.notifications.filter(notification => !notification.read).length;
        }
        this.unreadCount = count;
    }
};
__decorate([
    ViewChild('notificationsOrigin')
], NotificationsComponent.prototype, "_notificationsOrigin", void 0);
__decorate([
    ViewChild('notificationsPanel')
], NotificationsComponent.prototype, "_notificationsPanel", void 0);
NotificationsComponent = __decorate([
    Component({
        selector: 'notifications',
        templateUrl: './notifications.component.html',
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'notifications',
        standalone: true,
        imports: [MatButtonModule, NgIf, MatIconModule, MatTooltipModule, NgFor, NgClass, NgTemplateOutlet, RouterLink, DatePipe],
    })
], NotificationsComponent);
export { NotificationsComponent };
//# sourceMappingURL=notifications.component.js.map