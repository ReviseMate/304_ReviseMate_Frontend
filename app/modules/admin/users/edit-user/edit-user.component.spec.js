import { TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
describe('EditUserComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditUserComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-user.component.spec.js.map