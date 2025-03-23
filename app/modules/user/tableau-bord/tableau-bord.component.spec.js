import { TestBed } from '@angular/core/testing';
import { TableauBordComponent } from './tableau-bord.component';
describe('TableauBordComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableauBordComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TableauBordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tableau-bord.component.spec.js.map