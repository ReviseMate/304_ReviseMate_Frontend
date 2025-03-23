import { TestBed } from '@angular/core/testing';
import { CreateCarteComponent } from './create-carte.component';
describe('CreateCarteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateCarteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CreateCarteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-carte.component.spec.js.map