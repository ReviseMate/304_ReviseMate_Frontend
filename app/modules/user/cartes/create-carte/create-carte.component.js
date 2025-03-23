import { __decorate } from "tslib";
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { UowService } from "../../../../services/uow.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatModule } from "../../../../mat.modules";
let CreateCarteComponent = class CreateCarteComponent {
    constructor(fb) {
        this.fb = fb;
        this.PoppupContent = 'Carte memoire sauvegardée avec succès'; // Contenu du message de la popup
        this.ifError = false;
        this.uow = inject(UowService);
        this._router = inject(Router);
        this.dialog = inject(MatDialog);
    }
    ngOnInit() {
        // Vérification et récupération des données envoyées dans la redirection
        const navigationState = history.state?.iaResponse;
        if (navigationState) {
            this.iaResponse = navigationState;
            console.log('Données reçues de la redirection :', this.iaResponse);
            this.initializeForm();
        }
        else {
            console.log('Aucune donnée reçue via redirection.');
            this.initializeForm(); // Si aucune donnée reçue, on initialise quand même le formulaire
        }
    }
    initializeForm() {
        this.carteMemoireForm = this.fb.group({
            titre: ['', Validators.required],
            id_utilisateur: [''],
            questions_reponses: this.fb.array([])
        });
        // Vérification si iaResponse contient des données valides
        if (this.iaResponse && this.iaResponse.data && this.iaResponse.data.length > 0) {
            console.log('Données reçues et ajoutées au formulaire :', this.iaResponse.data);
            this.iaResponse.data.forEach(item => {
                this.addQuestionReponse(item.question, item.réponse);
            });
        }
        else {
            console.log('Aucune donnée reçue, ajout d\'une question par défaut.');
            this.addQuestionReponse('', '');
        }
    }
    // Créer un groupe de formulaire pour une question/réponse
    createQuestionReponseGroup(question = '', reponse = '') {
        return this.fb.group({
            question: [question, Validators.required],
            réponse: [reponse, Validators.required]
        });
    }
    // Ajouter une nouvelle question/réponse au FormArray
    addQuestionReponse(question = '', reponse = '') {
        const questionsReponses = this.carteMemoireForm.get('questions_reponses');
        const questionReponseFormGroup = this.createQuestionReponseGroup(question, reponse);
        questionsReponses.push(questionReponseFormGroup);
    }
    // Soumettre le formulaire
    onSubmit() {
        // Récupérer l'utilisateur depuis le localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            // Ajouter l'id_utilisateur au formulaire
            this.carteMemoireForm.patchValue({ id_utilisateur: user.id });
            // Vérifier si le formulaire est valide
            if (this.carteMemoireForm.valid) {
                console.log('Formulaire soumis avec succès:', this.carteMemoireForm.value);
                // Envoyer les données au backend via UowService
                this.uow.cartes.post(this.carteMemoireForm.value).subscribe((res) => {
                    if (res.success) {
                        this._router.navigateByUrl('/user/cartes');
                    }
                    else {
                        this.ifError = true;
                        this.PoppupContent = 'Erreur lors de l\'enregistrement de la fiche';
                        this.InfoPoppup();
                    }
                });
            }
            else {
                console.log('Le formulaire est invalide.');
                this.ifError = true;
                this.PoppupContent = 'Veuillez renseigner le titre de votre carte mémoire.';
                this.InfoPoppup();
            }
        }
        else {
            console.log('Aucun utilisateur trouvé dans le localStorage.');
        }
    }
    InfoPoppup() {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '230px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    // Accesseur pour obtenir les contrôles de question/réponse
    get questionsReponses() {
        return this.carteMemoireForm.get('questions_reponses');
    }
};
__decorate([
    ViewChild('popupTemplate')
], CreateCarteComponent.prototype, "popupTemplate", void 0);
CreateCarteComponent = __decorate([
    Component({
        selector: 'app-create-carte',
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule, MatModule],
        templateUrl: './create-carte.component.html',
        styleUrls: ['./create-carte.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], CreateCarteComponent);
export { CreateCarteComponent };
//# sourceMappingURL=create-carte.component.js.map