import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let QuizService = class QuizService extends SuperService {
    constructor() {
        super('super/quiz');
    }
};
QuizService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], QuizService);
export { QuizService };
//# sourceMappingURL=quiz.service.js.map