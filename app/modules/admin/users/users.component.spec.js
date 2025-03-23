import { TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
describe('UsersComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UsersComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=users.component.spec.js.map