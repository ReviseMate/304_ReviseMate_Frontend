import { __decorate } from "tslib";
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, SecurityContext, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
let FuseHighlightComponent = class FuseHighlightComponent {
    /**
     * Constructor
     */
    constructor(_changeDetectorRef, _domSanitizer, _elementRef, _renderer2, _fuseHighlightService, _viewContainerRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._domSanitizer = _domSanitizer;
        this._elementRef = _elementRef;
        this._renderer2 = _renderer2;
        this._fuseHighlightService = _fuseHighlightService;
        this._viewContainerRef = _viewContainerRef;
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
        // Code & Lang
        if ('code' in changes || 'lang' in changes) {
            // Return if the viewContainerRef is not available
            if (!this._viewContainerRef.length) {
                return;
            }
            // Highlight and insert the code
            this._highlightAndInsert();
        }
    }
    /**
     * After view init
     */
    ngAfterViewInit() {
        // Return if there is no language set
        if (!this.lang) {
            return;
        }
        // If there is no code input, get the code from
        // the textarea
        if (!this.code) {
            // Get the code
            this.code = this._elementRef.nativeElement.value;
        }
        // Highlight and insert
        this._highlightAndInsert();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Highlight and insert the highlighted code
     *
     * @private
     */
    _highlightAndInsert() {
        // Return if the template reference is not available
        if (!this.templateRef) {
            return;
        }
        // Return if the code or language is not defined
        if (!this.code || !this.lang) {
            return;
        }
        // Destroy the component if there is already one
        if (this._viewRef) {
            this._viewRef.destroy();
            this._viewRef = null;
        }
        // Highlight and sanitize the code just in case
        this.highlightedCode = this._domSanitizer.sanitize(SecurityContext.HTML, this._fuseHighlightService.highlight(this.code, this.lang));
        // Return if the highlighted code is null
        if (this.highlightedCode === null) {
            return;
        }
        // Render and insert the template
        this._viewRef = this._viewContainerRef.createEmbeddedView(this.templateRef, {
            highlightedCode: this.highlightedCode,
            lang: this.lang,
        });
        // Detect the changes
        this._viewRef.detectChanges();
    }
};
__decorate([
    Input()
], FuseHighlightComponent.prototype, "code", void 0);
__decorate([
    Input()
], FuseHighlightComponent.prototype, "lang", void 0);
__decorate([
    ViewChild(TemplateRef)
], FuseHighlightComponent.prototype, "templateRef", void 0);
FuseHighlightComponent = __decorate([
    Component({
        selector: 'textarea[fuse-highlight]',
        templateUrl: './highlight.component.html',
        styleUrls: ['./highlight.component.scss'],
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        exportAs: 'fuseHighlight',
        standalone: true,
        imports: [NgClass],
    })
], FuseHighlightComponent);
export { FuseHighlightComponent };
//# sourceMappingURL=highlight.component.js.map