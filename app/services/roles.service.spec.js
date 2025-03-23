import { TestBed } from '@angular/core/testing';
import { RolesService } from './roles.service';
describe('RolesService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RolesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=roles.service.spec.js.map