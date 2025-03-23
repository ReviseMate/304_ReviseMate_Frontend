import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let QuizDataService = class QuizDataService {
    constructor(http) {
        this.http = http;
    }
    getQuizQuestions(quizId) {
        return this.http.get(`http://localhost:3000/question/quiz/${quizId}`, { withCredentials: true });
    }
};
QuizDataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], QuizDataService);
export { QuizDataService };
//# sourceMappingURL=quiz-data.service.js.map