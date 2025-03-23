import { __decorate } from "tslib";
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from "../../../services/uow.service";
import { ScoreService } from "../../../services/score.service"; // Importez ScoreService
import { RouterLink } from '@angular/router';
import { MatModule } from "../../../mat.modules";
let QuizComponent = class QuizComponent {
    constructor() {
        this.uow = inject(UowService);
        this.scoreService = inject(ScoreService); // Injectez ScoreService
        this.user = JSON.parse(localStorage.getItem("user"));
        this.message = '';
        this.quizs = [];
    }
    ngOnInit() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.uow.quiz.getAll().subscribe((res) => {
            if (res.success) {
                if (res.data.length === 0) {
                    this.message = "Aucune fiche trouvée";
                }
                else {
                    this.quizs = res.data.filter((quiz) => quiz.id_utilisateur === user?.id);
                    this.loadScores();
                }
            }
            else {
                console.log("No data fetched");
            }
        }, (error) => {
            console.error("Error fetching data", error);
        });
    }
    //Afficher le score
    loadScores() {
        this.quizs.forEach((quiz) => {
            this.scoreService.getQuizScores(quiz._id).subscribe((scores) => {
                if (scores && scores.length > 0) {
                    const latestScore = scores[scores.length - 1];
                    quiz.correctAnswers = latestScore.correctAnswers;
                    quiz.totalQuestions = latestScore.totalQuestions;
                    quiz.date_score = latestScore.date;
                }
            });
        });
    }
    //Supprimer le quiz
    deleteQuiz(id) {
        this.uow.quiz.delete(id).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
};
QuizComponent = __decorate([
    Component({
        selector: 'app-quiz',
        standalone: true,
        imports: [CommonModule, MatModule, RouterLink],
        templateUrl: './quiz.component.html',
        styleUrls: ['./quiz.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], QuizComponent);
export { QuizComponent };
//# sourceMappingURL=quiz.component.js.map