import { __decorate } from "tslib";
import { Overlay } from '@angular/cdk/overlay';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, HostBinding, inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from "../../../../@fuse/animations/public-api";
import { debounceTime, filter, map, Subject, takeUntil } from 'rxjs';
let SearchComponent = class SearchComponent {
    /**
     * Constructor
     */
    constructor(_elementRef, _httpClient, _renderer2) {
        this._elementRef = _elementRef;
        this._httpClient = _httpClient;
        this._renderer2 = _renderer2;
        this.appearance = 'basic';
        this.debounce = 300;
        this.minLength = 2;
        this.search = new EventEmitter();
        this.opened = false;
        this.searchControl = new UntypedFormControl();
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Host binding for component classes
     */
    get classList() {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened,
        };
    }
    /**
     * Setter for bar search input
     *
     * @param value
     */
    set barSearchInput(value) {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if (value) {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {
                // Focus to the input element
                value.nativeElement.focus();
            });
        }
    }
    /**
     * Setter for mat-autocomplete element reference
     *
     * @param value
     */
    set matAutocomplete(value) {
        this._matAutocomplete = value;
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
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
    }
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to the search field value changes
        this.searchControl.valueChanges
            .pipe(debounceTime(this.debounce), takeUntil(this._unsubscribeAll), map((value) => {
            // Set the resultSets to null if there is no value or
            // the length of the value is smaller than the minLength
            // so the autocomplete panel can be closed
            if (!value || value.length < this.minLength) {
                this.resultSets = null;
            }
            // Continue
            return value;
        }), 
        // Filter out undefined/null/false statements and also
        // filter out the values that are smaller than minLength
        filter(value => value && value.length >= this.minLength))
            .subscribe((value) => {
            this._httpClient.post('api/common/search', { query: value })
                .subscribe((resultSets) => {
                // Store the result sets
                this.resultSets = resultSets;
                // Execute the event
                this.search.next(resultSets);
            });
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
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event) {
        // Escape
        if (event.code === 'Escape') {
            // If the appearance is 'bar' and the mat-autocomplete is not open, close the search
            if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) {
                this.close();
            }
        }
    }
    /**
     * Open the search
     * Used in 'bar'
     */
    open() {
        // Return if it's already opened
        if (this.opened) {
            return;
        }
        // Open the search
        this.opened = true;
    }
    /**
     * Close the search
     * * Used in 'bar'
     */
    close() {
        // Return if it's already closed
        if (!this.opened) {
            return;
        }
        // Clear the search input
        this.searchControl.setValue('');
        // Close the search
        this.opened = false;
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
};
__decorate([
    Input()
], SearchComponent.prototype, "appearance", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "debounce", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "minLength", void 0);
__decorate([
    Output()
], SearchComponent.prototype, "search", void 0);
__decorate([
    HostBinding('class')
], SearchComponent.prototype, "classList", null);
__decorate([
    ViewChild('barSearchInput')
], SearchComponent.prototype, "barSearchInput", null);
__decorate([
    ViewChild('matAutocomplete')
], SearchComponent.prototype, "matAutocomplete", null);
SearchComponent = __decorate([
    Component({
        selector: 'search',
        templateUrl: './search.component.html',
        encapsulation: ViewEncapsulation.None,
        exportAs: 'fuseSearch',
        animations: fuseAnimations,
        standalone: true,
        imports: [NgIf, MatButtonModule, MatIconModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, MatOptionModule, NgFor, RouterLink, NgTemplateOutlet, MatFormFieldModule, MatInputModule, NgClass],
        providers: [
            {
                provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
                useFactory: () => {
                    const overlay = inject(Overlay);
                    return () => overlay.scrollStrategies.block();
                },
            },
        ],
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map