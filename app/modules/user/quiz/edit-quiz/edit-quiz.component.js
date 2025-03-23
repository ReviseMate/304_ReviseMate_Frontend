import { __decorate } from "tslib";
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UowService } from "../../../../services/uow.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
let EditQuizComponent = class EditQuizComponent {
    constructor() {
        this.quizTitle = '';
        this.questions = [];
        this.PoppupContent = 'quiz sauvegardée avec succès'; // Contenu du message de la popup
        this.storedAnswers = [];
        this.uow = inject(UowService);
        this.dialog = inject(MatDialog);
        this._router = inject(Router);
        this.route = inject(ActivatedRoute);
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.user = JSON.parse(localStorage.getItem("user"));
        this.uow.quiz.getOne(this.id).subscribe((res) => {
            if (res.data) {
                this.quizTitle = res.data.titre;
                this.uow.question.getQuizQuestions(this.id).subscribe((questionRes) => {
                    console.log(questionRes);
                    questionRes.questions.forEach(element => {
                        this.questions.push({
                            id: element._id,
                            question: element.question,
                            allAnswers: [
                                { text: element.correct_answer },
                                ...element.incorrect_answers.map(answer => ({ text: answer }))
                            ],
                            correct_answer: element.correct_answer,
                            id_quiz: '',
                            incorrect_answers: element.wrongAnswers
                        });
                    });
                    console.log("=========");
                    console.log(questionRes.questions);
                });
            }
        });
    }
    addQuestion() {
        this.questions.push({
            id: '',
            question: '',
            allAnswers: [{ text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false },
                { text: '', isChecked: false }],
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
    InfoPoppup() {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    submitQuiz() {
        const updatedQuiz = {
            id: this.id,
            titre: this.quizTitle,
            id_utilisateur: this.user.id, // Add this line
        };
        const questions = this.questions.map(q => ({
            _id: q.id,
            question: q.question,
            id_quiz: this.id,
            correct_answer: q.allAnswers.find(ans => ans.text === q.correct_answer)?.text || '',
            incorrect_answers: q.allAnswers
                .filter(ans => ans.text !== q.correct_answer)
                .map(ans => ans.text),
        }));
        this.uow.quiz.put(this.id, updatedQuiz).subscribe((res) => {
            console.log("Quiz updated successfully:", res);
            let requestsCompleted = 0;
            console.log("================");
            console.log(questions);
            questions.forEach(question => {
                this.uow.question.put(question._id, question).subscribe({
                    next: (response) => {
                        console.log('Question créée:', response);
                        requestsCompleted++;
                        if (requestsCompleted === this.questions.length) {
                            this._router.navigateByUrl('/user/quiz'); // Navigate only after all requests complete
                        }
                    },
                    error: (err) => {
                        console.error('Erreur lors de la création de la question:', err);
                        this.PoppupContent = "Erreur lors de l'enregistrement du quiz";
                        this.InfoPoppup();
                    }
                });
                this._router.navigate(['/quizzes']); // Rediriger après mise à jour
            }, (err) => {
                console.error("Error updating quiz:", err);
                alert("Erreur lors de la mise à jour du quiz.");
            });
        });
    }
};
__decorate([
    ViewChild('popupTemplate')
], EditQuizComponent.prototype, "popupTemplate", void 0);
EditQuizComponent = __decorate([
    Component({
        selector: 'app-edit-quiz',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './edit-quiz.component.html',
        styleUrls: ['./edit-quiz.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], EditQuizComponent);
export { EditQuizComponent };
//# sourceMappingURL=edit-quiz.component.js.map