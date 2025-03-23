import { TestBed } from '@angular/core/testing';
import { CreateClasseComponent } from './create-classe.component';
describe('CreateClasseComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateClasseComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CreateClasseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-classe.component.spec.js.map