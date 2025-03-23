import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
let QuestionService = class QuestionService extends SuperService {
    constructor() {
        super('super/question');
    }
    getQuizQuestions(idQuiz) {
        return this.http.get(`${this.url}/question/quiz/${idQuiz}`, { withCredentials: true });
    }
};
QuestionService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], QuestionService);
export { QuestionService };
//# sourceMappingURL=question.service.js.map