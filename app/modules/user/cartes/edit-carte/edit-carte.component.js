import { __decorate } from "tslib";
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UowService } from "../../../../services/uow.service";
import { ActivatedRoute, Router } from '@angular/router';
import { CarteMemoire } from "../../../../models/Carte";
import { MatModule } from "../../../../mat.modules";
import { MatDialog } from '@angular/material/dialog';
let EditCarteComponent = class EditCarteComponent {
    constructor(fb) {
        this.fb = fb;
        this.PoppupContent = '';
        this.ifError = false;
        this.uow = inject(UowService);
        this.route = inject(ActivatedRoute);
        this.carte = new CarteMemoire();
        this.dialog = inject(MatDialog);
        this.router = inject(Router);
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.uow.cartes.getOne(this.id).subscribe((res) => {
            if (res.success || res.length > 0) {
                this.carte = res.data;
                console.log(this.carte);
                this.createForm();
            }
            else {
                console.log('Erreur lors de recuperation de carte memoire');
                //     this.PoppupContent='Erreur lors de l\'enregistrement de la fiche';
                //    this.InfoPoppup();
            }
        });
    }
    createForm() {
        if (!this.carte || !this.carte.questions_reponses) {
            console.log("Les données ne sont pas encore chargées !");
            return;
        }
        this.carteMemoireForm = this.fb.group({
            titre: [this.carte.titre, Validators.required],
            id_utilisateur: [this.carte.id_utilisateur],
            questions_reponses: this.fb.array(this.createQuestionsReponsesArray())
        });
        console.log("Formulaire initialisé avec :", this.carteMemoireForm.value);
    }
    // Fonction pour transformer les questions/réponses en FormGroup
    createQuestionsReponsesArray() {
        return this.carte.questions_reponses?.map(qr => this.fb.group({
            question: [qr.question, Validators.required],
            réponse: [qr.réponse, Validators.required]
        })) || [this.createQuestionReponseGroup()]; // Ajoute un champ vide par défaut si aucune donnée
    }
    // Fonction pour créer un groupe vide pour une question/réponse
    createQuestionReponseGroup() {
        return this.fb.group({
            question: ['', Validators.required],
            réponse: ['', Validators.required]
        });
    }
    // Fonction pour ajouter une nouvelle section de question/réponse
    addQuestionReponse() {
        const questionsReponses = this.carteMemoireForm.get('questions_reponses');
        questionsReponses.push(this.createQuestionReponseGroup());
    }
    // Fonction pour soumettre le formulaire
    onSubmit() {
        console.log(this.carteMemoireForm.value);
        this.uow.cartes.put(this.id, this.carteMemoireForm.value).subscribe((res) => {
            console.log(res);
            if (res.success) {
                this.ifError = false;
                this.dialog.closeAll();
                this.router.navigate(['/user/cartes']);
            }
            else {
                this.PoppupContent = 'Erreur lors de l\'enregistrement de modification de la carte';
                this.ifError = true;
                this.InfoPoppup();
            }
        });
    }
    // Accesseur pour obtenir les contrôles de question/réponse
    get questionsReponses() {
        return this.carteMemoireForm.get('questions_reponses');
    }
    InfoPoppup() {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
};
__decorate([
    ViewChild('popupTemplate')
], EditCarteComponent.prototype, "popupTemplate", void 0);
EditCarteComponent = __decorate([
    Component({
        selector: 'app-edit-carte',
        standalone: true,
        imports: [CommonModule, FormsModule, ReactiveFormsModule,
            MatModule],
        templateUrl: './edit-carte.component.html',
        styleUrls: ['./edit-carte.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], EditCarteComponent);
export { EditCarteComponent };
//# sourceMappingURL=edit-carte.component.js.map