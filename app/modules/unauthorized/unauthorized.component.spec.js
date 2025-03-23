import { TestBed } from '@angular/core/testing';
import { UnauthorizedComponent } from './unauthorized.component';
describe('UnauthorizedComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnauthorizedComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UnauthorizedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=unauthorized.component.spec.js.map