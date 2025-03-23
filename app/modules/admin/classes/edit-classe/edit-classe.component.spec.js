import { TestBed } from '@angular/core/testing';
import { EditClasseComponent } from './edit-classe.component';
describe('EditClasseComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditClasseComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditClasseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-classe.component.spec.js.map