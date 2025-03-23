import { __decorate } from "tslib";
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { IaGenerationService } from './../../../services/ia-generation.service';
import { Router } from '@angular/router';
import { MatModule } from "../../../mat.modules";
import { MatDialog } from '@angular/material/dialog';
let ImportationFilesComponent = class ImportationFilesComponent {
    constructor() {
        this.PoppupContent = 'Veuillez patienter quelques instants';
        this._formBuilder = inject(UntypedFormBuilder);
        this.iaGenerationService = inject(IaGenerationService);
        this._router = inject(Router);
        this.dialog = inject(MatDialog);
    }
    ngOnInit() {
        this.form = this._formBuilder.group({
            file: [null],
            text: [''],
            promt: [''],
            type: ['fiche', [Validators.required]], // Ajouter la validation pour le type
        });
        console.log('Form initialized:', this.form);
    }
    onFileChange(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.form.patchValue({ file });
            this.form.get('text')?.setValue('');
            console.log('File selected:', file);
        }
    }
    submit() {
        console.log('Form submitted');
        if (this.form.invalid) {
            console.log('Form is invalid');
            return;
        }
        this.form.disable();
        const formType = this.form.get('type')?.value;
        console.log('Form type:', formType);
        // Suppression du prompt si le type est 'carte' ou 'quiz'
        if (formType === 'carte' || formType === 'quiz') {
            this.form.get('promt')?.setValue('');
            console.log('Prompt cleared for type:', formType);
        }
        // Appel de la popup de chargement avant de commencer la requête (que ce soit pour le fichier ou le texte)
        this.InfoPoppup();
        // Traitement du fichier PDF
        if (this.form.get('file')?.value) {
            const formData = new FormData();
            formData.append('file', this.form.get('file')?.value);
            console.log('File uploaded:', this.form.get('file')?.value);
            // Ajouter le prompt (uniquement pour 'fiche')
            const customPrompt = formType === 'fiche' ? this.form.get('promt')?.value : undefined;
            if (customPrompt) {
                formData.append('customPrompt', customPrompt);
                console.log('Custom prompt added:', customPrompt);
            }
            //Génération avec pdf
            this.iaGenerationService.getIAanswerFromPdf(formData, formType).subscribe((r) => {
                // Vérifier si 'revisionSheet' est présent et non vide
                if (r && r.revisionSheet || r.success) {
                    // Fermer la popup avant la redirection
                    this.dialog.closeAll();
                    // Effectuer la redirection selon le type
                    if (formType === 'fiche') {
                        this._router.navigateByUrl('/user/fiches/create', { state: { iaResponse: r } });
                    }
                    else if (formType === 'carte') {
                        this._router.navigateByUrl('/user/cartes/create', { state: { iaResponse: r } });
                    }
                    else if (formType === 'quiz') {
                        this._router.navigateByUrl('/user/quiz/create', { state: { iaResponse: r } });
                    }
                }
                else {
                    // Si la réponse n'est pas valide ou ne contient pas de 'revisionSheet'
                    this.PoppupContent = r.message || 'An error occurred';
                    this.InfoPoppup(); // Afficher la popup d'erreur
                }
            });
            // Vérifier que le type est bien 'fiche' et que la redirection est effectuée
        }
        else if (this.form.get('text')?.value) {
            // Traitement du texte
            const textData = {
                text: this.form.get('text')?.value,
                ...(formType === 'fiche' && this.form.get('promt')?.value && { customPrompt: this.form.get('promt')?.value })
            };
            console.log('Text data:', textData);
            this.iaGenerationService.getIAanswerFromText(textData, formType).subscribe(r => {
                console.log('Text response:', r);
                this.dialog.closeAll();
                // Ajout de la redirection pour 'fiche', 'carte', ou 'quiz'
                if (formType === 'fiche') {
                    this._router.navigateByUrl('/user/fiches/create', { state: { iaResponse: r } });
                }
                else if (formType === 'carte') {
                    this._router.navigateByUrl('/user/cartes/create', { state: { iaResponse: r } });
                }
                else if (formType === 'quiz') {
                    this._router.navigateByUrl('/user/quiz/create', { state: { iaResponse: r } });
                }
            });
        }
        // On réactive le formulaire une fois la soumission effectuée
        this.form.enable();
        console.log('Form re-enabled');
    }
    InfoPoppup() {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('Popup closed', result);
        });
    }
};
__decorate([
    ViewChild('popupTemplate')
], ImportationFilesComponent.prototype, "popupTemplate", void 0);
ImportationFilesComponent = __decorate([
    Component({
        selector: 'app-importation-files',
        standalone: true,
        imports: [CommonModule, NgxFileDropModule, ReactiveFormsModule, MatModule],
        templateUrl: './importation-files.component.html',
        styleUrls: ['./importation-files.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], ImportationFilesComponent);
export { ImportationFilesComponent };
//# sourceMappingURL=importation-files.component.js.map