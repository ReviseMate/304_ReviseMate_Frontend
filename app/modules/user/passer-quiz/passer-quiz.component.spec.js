import { TestBed } from '@angular/core/testing';
import { PasserQuizComponent } from './passer-quiz.component';
describe('PasserQuizComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PasserQuizComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PasserQuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=passer-quiz.component.spec.js.map