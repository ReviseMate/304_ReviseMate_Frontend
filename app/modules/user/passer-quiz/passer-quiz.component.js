import { __decorate } from "tslib";
import { Component, ViewEncapsulation, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizDataService } from "../../../services/quiz-data.service";
import { ScoreService } from "../../../services/score.service"; // Importez ScoreService
let PasserQuizComponent = class PasserQuizComponent {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.quizCompleted = false;
        this.score = 0;
        this.selectedAnswer = '';
        this.quizTitle = '';
        this.popupContent = 'Quiz terminé avec succès!';
        this.ifError = false;
        this.quizDataService = inject(QuizDataService);
        this.dialog = inject(MatDialog);
        this.route = inject(ActivatedRoute);
        this._router = inject(Router);
        this.scoreService = inject(ScoreService);
    }
    ngOnInit() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.userId = user.id;
        this.id = this.route.snapshot.paramMap.get('id') || '';
        console.log('ID du quiz : ', this.id);
        // Récupérer les questions du quiz
        this.quizDataService.getQuizQuestions(this.id).subscribe((response) => {
            console.log('Données du quiz reçues :', response);
            if (response && response.questions && response.questions.length > 0) {
                console.log('Questions reçues :', response.questions);
                this.questions = response.questions.map((question) => {
                    const options = [...question.incorrect_answers, question.correct_answer];
                    return { ...question, options: this.shuffleArray(options) };
                });
                // Récupérer le titre du quiz
                this.quizTitle = response.quizTitle;
            }
            else {
                console.error('Aucune question trouvée pour ce quiz');
            }
        });
    }
    // Fonction pour mélanger les éléments d'un tableau
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    // Fonction pour vérifier la réponse sélectionnée
    checkAnswer(selectedAnswer) {
        if (selectedAnswer === this.questions[this.currentQuestionIndex].correct_answer) {
            this.score++;
        }
    }
    // Fonction pour passer à la question suivante
    nextQuestion() {
        this.checkAnswer(this.selectedAnswer);
        this.selectedAnswer = '';
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        }
        else {
            this.quizCompleted = true;
            this.saveQuizScore();
        }
    }
    // Fonction pour sauvegarder le score
    saveQuizScore() {
        this.scoreService.saveScore(this.id, this.userId, this.score, this.questions.length).subscribe((response) => {
            console.log('Score sauvegardé avec succès :', response);
        }, (error) => {
            console.error('Erreur lors de la sauvegarde du score :', error);
        });
    }
    // Fonction pour fermer la popup
    closePopup() {
        this.quizCompleted = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this._router.navigate(['/user/quiz-list']);
    }
};
__decorate([
    ViewChild('popupTemplate')
], PasserQuizComponent.prototype, "popupTemplate", void 0);
PasserQuizComponent = __decorate([
    Component({
        selector: 'app-passer-quiz',
        standalone: true,
        imports: [FormsModule, CommonModule],
        templateUrl: './passer-quiz.component.html',
        styleUrls: ['./passer-quiz.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], PasserQuizComponent);
export { PasserQuizComponent };
//# sourceMappingURL=passer-quiz.component.js.map