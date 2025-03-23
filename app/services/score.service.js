import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ScoreService = class ScoreService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:3000/quiz'; // Assurez-vous que l'URL correspond à votre backend
    }
    saveScore(quizId, userId, correctAnswers, totalQuestions) {
        const url = `${this.apiUrl}/save-score/${quizId}`;
        return this.http.post(url, { userId, correctAnswers, totalQuestions }, { withCredentials: true });
    }
    // Méthode pour récupérer les scores d'un quiz
    getQuizScores(quizId) {
        const url = `${this.apiUrl}/scores/${quizId}`;
        return this.http.get(url, { withCredentials: true });
    }
};
ScoreService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ScoreService);
export { ScoreService };
//# sourceMappingURL=score.service.js.map