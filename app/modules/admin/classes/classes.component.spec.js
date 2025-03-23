import { TestBed } from '@angular/core/testing';
import { ClassesComponent } from './classes.component';
describe('ClassesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClassesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ClassesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=classes.component.spec.js.map