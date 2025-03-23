import { TestBed } from '@angular/core/testing';
import { CartesComponent } from './cartes.component';
describe('CartesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CartesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=cartes.component.spec.js.map