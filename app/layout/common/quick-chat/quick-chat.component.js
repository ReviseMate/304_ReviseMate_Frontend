import { __decorate, __param } from "tslib";
import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, DOCUMENT, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, HostListener, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseScrollbarDirective } from "../../../../@fuse/directives/scrollbar";
import { Subject, takeUntil } from 'rxjs';
let QuickChatComponent = class QuickChatComponent {
    /**
     * Constructor
     */
    constructor(_document, _elementRef, _renderer2, _ngZone, _quickChatService, _scrollStrategyOptions) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer2 = _renderer2;
        this._ngZone = _ngZone;
        this._quickChatService = _quickChatService;
        this._scrollStrategyOptions = _scrollStrategyOptions;
        this.opened = false;
        this._scrollStrategy = this._scrollStrategyOptions.block();
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Host binding for component classes
     */
    get classList() {
        return {
            'quick-chat-opened': this.opened,
        };
    }
    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    _resizeMessageInput() {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';
                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
            });
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Chat
        this._quickChatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat) => {
            this.chat = chat;
        });
        // Chats
        this._quickChatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats) => {
            this.chats = chats;
        });
        // Selected chat
        this._quickChatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat) => {
            this.selectedChat = chat;
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
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Disconnect the mutation observer
        this._mutationObserver.disconnect();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the panel
     */
    open() {
        // Return if the panel has already opened
        if (this.opened) {
            return;
        }
        // Open the panel
        this._toggleOpened(true);
    }
    /**
     * Close the panel
     */
    close() {
        // Return if the panel has already closed
        if (!this.opened) {
            return;
        }
        // Close the panel
        this._toggleOpened(false);
    }
    /**
     * Toggle the panel
     */
    toggle() {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Select the chat
     *
     * @param id
     */
    selectChat(id) {
        // Open the panel
        this._toggleOpened(true);
        // Get the chat data
        this._quickChatService.getChatById(id).subscribe();
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
     * Show the backdrop
     *
     * @private
     */
    _showOverlay() {
        // Try hiding the overlay in case there is one already opened
        this._hideOverlay();
        // Create the backdrop element
        this._overlay = this._renderer2.createElement('div');
        // Return if overlay couldn't be create for some reason
        if (!this._overlay) {
            return;
        }
        // Add a class to the backdrop element
        this._overlay.classList.add('quick-chat-overlay');
        // Append the backdrop to the parent of the panel
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);
        // Enable block scroll strategy
        this._scrollStrategy.enable();
        // Add an event listener to the overlay
        this._overlay.addEventListener('click', () => {
            this.close();
        });
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
        // If the backdrop still exists...
        if (this._overlay) {
            // Remove the backdrop
            this._overlay.parentNode.removeChild(this._overlay);
            this._overlay = null;
        }
        // Disable block scroll strategy
        this._scrollStrategy.disable();
    }
    /**
     * Open/close the panel
     *
     * @param open
     * @private
     */
    _toggleOpened(open) {
        // Set the opened
        this.opened = open;
        // If the panel opens, show the overlay
        if (open) {
            this._showOverlay();
        }
        // Otherwise, hide the overlay
        else {
            this._hideOverlay();
        }
    }
};
__decorate([
    ViewChild('messageInput')
], QuickChatComponent.prototype, "messageInput", void 0);
__decorate([
    HostBinding('class')
], QuickChatComponent.prototype, "classList", null);
__decorate([
    HostListener('input'),
    HostListener('ngModelChange')
], QuickChatComponent.prototype, "_resizeMessageInput", null);
QuickChatComponent = __decorate([
    Component({
        selector: 'quick-chat',
        templateUrl: './quick-chat.component.html',
        styleUrls: ['./quick-chat.component.scss'],
        encapsulation: ViewEncapsulation.None,
        exportAs: 'quickChat',
        standalone: true,
        imports: [NgClass, NgIf, MatIconModule, MatButtonModule, FuseScrollbarDirective, NgFor, NgTemplateOutlet, MatFormFieldModule, MatInputModule, TextFieldModule, DatePipe],
    }),
    __param(0, Inject(DOCUMENT))
], QuickChatComponent);
export { QuickChatComponent };
//# sourceMappingURL=quick-chat.component.js.map