import { TestBed } from '@angular/core/testing';
import { EditCarteComponent } from './edit-carte.component';
describe('EditCarteComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditCarteComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditCarteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-carte.component.spec.js.map