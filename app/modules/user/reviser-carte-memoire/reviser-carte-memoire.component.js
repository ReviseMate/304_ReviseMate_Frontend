import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from "../../../services/uow.service";
import { CarteMemoire } from "../../../models/Carte";
let ReviserCarteMemoireComponent = class ReviserCarteMemoireComponent {
    constructor() {
        this.isFlipped = false;
        this.currentCard = 0;
        this.totalCards = 0; // Nombre total de cartes à réviser
        this.timerRunning = false;
        this.isPaused = false;
        this.timeLeft = 5 * 60;
        this.minutes = 5;
        this.seconds = 0;
        this.carteTitre = '';
        this.autoScrollActive = false;
        this.isShowingAnswer = false;
        this.popupContent = 'Carte sauvegardée avec succès';
        this.ifError = false;
        this.uow = inject(UowService);
        this.dialog = inject(MatDialog);
        this.route = inject(ActivatedRoute);
        this._router = inject(Router);
        this.carte = new CarteMemoire();
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        console.log('ID de la carte : ', this.id);
        this.uow.cartes.getOne(this.id).subscribe((response) => {
            console.log('Données de la carte reçues :', response);
            if (response.success && response.data) {
                this.carte = response.data;
                this.totalCards = this.carte.questions_reponses.length;
                this.carteTitre = this.carte.titre; // Assigner le titre à la propriété carteTitre
            }
            else {
                console.error('Aucune question réponse trouvée pour cette carte');
            }
        });
    }
    getTitre() {
        return this.carte.titre || 'Titre non disponible';
    }
    // Méthode pour retourner la carte
    flipCard() {
        this.isFlipped = !this.isFlipped;
    }
    // Méthode pour passer à la carte suivante
    nextCard() {
        if (this.currentCard < this.totalCards - 1) {
            this.currentCard++;
            this.isFlipped = false; // Retourne la carte à la question
            this.isShowingAnswer = false; // Réinitialise l'affichage de la question
        }
    }
    // Méthode pour passer à la carte précédente
    prevCard() {
        if (this.currentCard > 0) {
            this.currentCard--;
            this.isFlipped = false;
            this.isShowingAnswer = false;
        }
    }
    // Méthode pour démarrer ou arrêter le minuteur
    toggleTimer() {
        if (this.timerRunning) {
            if (this.isPaused) {
                this.startTimer();
            }
            else {
                clearInterval(this.interval);
                this.isPaused = true;
            }
        }
        else {
            this.startTimer();
        }
    }
    // Méthode pour réinitialiser le minuteur
    startTimer() {
        if (this.timerRunning && !this.isPaused)
            return;
        this.timerRunning = true;
        this.isPaused = false;
        this.updateTimerDisplay();
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateTimerDisplay();
            }
            else {
                clearInterval(this.interval);
                this.timerRunning = false;
            }
        }, 1000);
    }
    // Méthode pour arrêter le minuteur
    stopTimer() {
        clearInterval(this.interval);
        this.timerRunning = false;
        this.isPaused = false;
        this.timeLeft = 5 * 60; // Réinitialise à 5 minutes
        this.updateTimerDisplay();
    }
    // Méthode pour mettre à jour l'affichage du minuteur
    updateTimerDisplay() {
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
    }
    // Méthode pour démarrer ou arrêter l'auto-défilement
    toggleAutoScroll() {
        if (this.autoScrollActive) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollActive = false;
        }
        else {
            this.autoScrollActive = true;
            this.autoScrollInterval = setInterval(() => {
                if (!this.isShowingAnswer) {
                    this.isFlipped = true;
                    this.isShowingAnswer = true;
                }
                else {
                    this.isFlipped = false;
                    this.isShowingAnswer = false;
                    this.nextCard();
                }
                if (this.currentCard === this.totalCards - 1) {
                    this.stopAutoScroll();
                }
            }, 5000);
        }
    }
    // Méthode pour arrêter l'auto-défilement
    stopAutoScroll() {
        clearInterval(this.autoScrollInterval);
        this.autoScrollActive = false;
    }
    // Méthode pour obtenir la question actuelle
    getCurrentQuestion() {
        return this.carte.questions_reponses[this.currentCard]?.question || '';
    }
    // Méthode pour obtenir la réponse actuelle
    getCurrentAnswer() {
        return this.carte.questions_reponses[this.currentCard]?.réponse || '';
    }
};
__decorate([
    ViewChild('popupTemplate')
], ReviserCarteMemoireComponent.prototype, "popupTemplate", void 0);
ReviserCarteMemoireComponent = __decorate([
    Component({
        selector: 'app-reviser-carte-memoire',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './reviser-carte-memoire.component.html',
        styleUrls: ['./reviser-carte-memoire.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], ReviserCarteMemoireComponent);
export { ReviserCarteMemoireComponent };
//# sourceMappingURL=reviser-carte-memoire.component.js.map