import { TestBed } from '@angular/core/testing';
import { FichesComponent } from './fiches.component';
describe('FichesComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FichesComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(FichesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=fiches.component.spec.js.map