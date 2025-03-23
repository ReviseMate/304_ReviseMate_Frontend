import { TestBed } from '@angular/core/testing';
import { IaGenerationService } from './ia-generation.service';
describe('IaGenerationService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IaGenerationService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ia-generation.service.spec.js.map