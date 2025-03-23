import { __decorate } from "tslib";
import { html2pdf } from 'html2pdf.js';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UowService } from "../../../../services/uow.service";
import { Fiche } from "../../../../models/Fiche";
import { MatDialog } from '@angular/material/dialog';
import { MatModule } from "../../../../mat.modules";
let EditFicheComponent = class EditFicheComponent {
    constructor() {
        this.content = ''; // Variable pour stocker le contenu de l'éditeur
        this.ficheName = ''; // Variable pour stocker le nom de la fiche
        this.PoppupContent = 'Fiche sauvegardée avec succès'; // Contenu du message de la popup
        this.ifError = false; // Variable pour gérer les erreurs
        this.uow = inject(UowService);
        this.dialog = inject(MatDialog);
        this.route = inject(ActivatedRoute);
        this._router = inject(Router);
        this.fiche = new Fiche();
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        console.log('ID de la fiche : ', this.id);
        this.uow.fiches.getOne(this.id).subscribe((e) => {
            this.fiche = e.data;
            this.content = e.data.contenu;
            this.ficheName = e.data.titre;
        });
    }
    // Méthode pour enregistrer la fiche
    saveFiche() {
        console.log('Fiche sauvegardée avec le contenu : ', this.content);
        this.fiche.contenu = this.content;
        this.fiche.titre = this.ficheName;
        this.uow.fiches.put(this.id, this.fiche).subscribe((res) => {
            if (res != null) {
                this.InfoPoppup();
                this._router.navigateByUrl('/user/fiches');
            }
            else {
                console.log('Erreur lors de l\'enregistrement de la fiche');
                this.PoppupContent = 'Erreur lors de l\'enregistrement de la fiche';
                this.InfoPoppup();
            }
        });
    }
    // Méthode pour générer un PDF à partir du contenu de Quill
    generatePDF() {
        const element = document.querySelector('.ql-editor');
        if (element) {
            // Générer un PDF
            html2pdf()
                .from(element)
                .save('fiche.pdf');
        }
    }
    // Méthode pour gérer l'appui sur la touche "Entrée"
    onEnterKey(event) {
        event.preventDefault();
        this.saveFiche(); // Enregistre la fiche uniquement
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
], EditFicheComponent.prototype, "popupTemplate", void 0);
EditFicheComponent = __decorate([
    Component({
        selector: 'app-edit-fiche',
        standalone: true,
        imports: [CommonModule, QuillModule, FormsModule, MatModule],
        templateUrl: './edit-fiche.component.html',
        styleUrls: ['./edit-fiche.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], EditFicheComponent);
export { EditFicheComponent };
//# sourceMappingURL=edit-fiche.component.js.map