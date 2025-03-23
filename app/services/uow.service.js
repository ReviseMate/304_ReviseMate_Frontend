import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ClasseService } from './classe.service';
import { FicheService } from './fiche.service';
import { CarteService } from './carte.service';
import { QuizService } from './quiz.service';
import { AuthService } from './auth.service';
import { IaGenerationService } from './ia-generation.service';
import { QuestionService } from './question.service';
import { RoleService } from './role.service';
// import { QuestionService } from './question.service'; pareil, je l'ai gardé au cas où
let UowService = class UowService {
    constructor(quizDataService) {
        this.quizDataService = quizDataService;
        this.quiz = new QuizService();
        this.users = new UserService();
        this.classes = new ClasseService();
        this.fiches = new FicheService();
        this.cartes = new CarteService();
        this.auth = new AuthService();
        this.ia = new IaGenerationService();
        this.question = new QuestionService();
        this.roles = new RoleService();
    }
    getQuizQuestions(quizId) {
        return this.quizDataService.getQuizQuestions(quizId);
    }
};
UowService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UowService);
export { UowService };
//# sourceMappingURL=uow.service.js.map