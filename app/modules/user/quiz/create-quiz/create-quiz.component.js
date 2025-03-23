import { __decorate } from "tslib";
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from "../../../../services/uow.service";
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatModule } from "../../../../mat.modules";
let CreateQuizComponent = class CreateQuizComponent {
    constructor() {
        this.quizTitle = '';
        this.isFromIa = false;
        this.questions = [];
        this.PoppupContent = 'Quiz sauvegardé avec succès';
        this.uow = inject(UowService);
        this.dialog = inject(MatDialog);
        this._router = inject(Router);
    }
    ngOnInit() {
        const state = history.state;
        if (state?.iaResponse) {
            this.isFromIa = true;
            state.iaResponse.data.forEach(element => {
                this.questions.push({
                    id: '',
                    question: element.question,
                    allAnswers: [
                        ...element.wrongAnswers.map(answer => ({ text: answer, isChecked: false })),
                        { text: element.correctAnswer, isChecked: true }
                    ],
                    correct_answer: element.correctAnswer,
                    id_quiz: '',
                    incorrect_answers: element.wrongAnswers
                });
            });
        }
        else {
            this.isFromIa = false;
            this.addQuestionReponse(); // Démarrer avec une question
        }
        this.user = JSON.parse(localStorage.getItem("user"));
    }
    addQuestionReponse() {
        this.questions.push({
            id: '',
            question: '',
            allAnswers: [
                { text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false }
            ],
            correct_answer: '',
            id_quiz: '',
            incorrect_answers: []
        });
    }
    removeQuestion(index) {
        this.questions.splice(index, 1);
    }
    theCorrectAnswer(question, selectedAnswer) {
        question.allAnswers.forEach(answer => {
            answer.isChecked = (answer === selectedAnswer);
        });
        question.correct_answer = selectedAnswer.text;
        console.log(`Réponse correcte pour la question "${question.question}": "${selectedAnswer.text}"`);
    }
    submitQuiz() {
        event.preventDefault();
        if (this.quizTitle.trim() === '') {
            this.PoppupContent = "Veuillez renseigner le titre du quiz";
            this.InfoPoppup();
            return;
        }
        this.questions = this.questions.map(({ allAnswers, correct_answer, ...question }) => {
            if (!correct_answer.trim()) {
                console.warn(`Aucune réponse correcte définie pour la question : ${question.question}`);
            }
            const incorrect_answers = allAnswers
                .filter(answer => answer.text.trim() !== correct_answer.trim())
                .map(answer => answer.text);
            return { ...question, correct_answer, incorrect_answers };
        });
        const quiz = {
            id: '',
            titre: this.quizTitle,
            id_utilisateur: this.user.id,
        };
        this.uow.quiz.post(quiz).subscribe((res) => {
            if (res.success) {
                this.questions.forEach(q => q.id_quiz = res.data._id);
                let requestsCompleted = 0;
                this.questions.forEach(question => {
                    this.uow.question.post(question).subscribe({
                        next: (response) => {
                            console.log('Question créée:', response);
                            requestsCompleted++;
                            if (requestsCompleted === this.questions.length) {
                                this._router.navigateByUrl('/user/quiz');
                            }
                        },
                        error: (err) => {
                            console.error('Erreur lors de la création de la question:', err);
                            this.PoppupContent = "Erreur lors de l'enregistrement du quiz";
                            this.InfoPoppup();
                        }
                    });
                });
            }
            else {
                this.PoppupContent = "Erreur lors de l'enregistrement du quiz";
                this.InfoPoppup();
            }
        });
    }
    InfoPoppup() {
        this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
    }
};
__decorate([
    ViewChild('popupTemplate')
], CreateQuizComponent.prototype, "popupTemplate", void 0);
CreateQuizComponent = __decorate([
    Component({
        selector: 'app-create-quiz',
        standalone: true,
        imports: [CommonModule, FormsModule, MatModule],
        templateUrl: './create-quiz.component.html',
        styleUrls: ['./create-quiz.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], CreateQuizComponent);
export { CreateQuizComponent };
//# sourceMappingURL=create-quiz.component.js.map