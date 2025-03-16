import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IaGenerationService } from './../../../services/ia-generation.service';
import { Router } from '@angular/router';
import { MatModule } from 'app/mat.modules';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-importation-files',
    standalone: true,
    imports: [CommonModule, NgxFileDropModule, ReactiveFormsModule, MatModule],
    templateUrl: './importation-files.component.html',
    styleUrls: ['./importation-files.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ImportationFilesComponent {
    PoppupContent: string = 'Veuillez patienter quelques instants';
    form: UntypedFormGroup;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    private _formBuilder = inject(UntypedFormBuilder);
    private iaGenerationService = inject(IaGenerationService);
    private _router = inject(Router);
    private dialog = inject(MatDialog);

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            file: [null],
            text: [''],
            promt: [''],
            type: ['fiche', [Validators.required]], // Ajouter la validation pour le type
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.form.patchValue({ file });
            this.form.get('text')?.setValue('');
            console.log('File selected:', file);
        }
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.form.disable();
        const formType = this.form.get('type')?.value;

        // Suppression du prompt si le type est 'carte' ou 'quiz'
        if (formType === 'carte' || formType === 'quiz') {
            this.form.get('promt')?.setValue('');
        }

        // Appel de la popup de chargement avant de commencer la requête (que ce soit pour le fichier ou le texte)
        this.InfoPoppup();

        // Traitement du fichier PDF
        if (this.form.get('file')?.value) {
            const formData = new FormData();
            formData.append('file', this.form.get('file')?.value);

            // Ajouter le prompt (uniquement pour 'fiche')
            const customPrompt = formType === 'fiche' ? this.form.get('promt')?.value : undefined;
            if (customPrompt) {
                formData.append('customPrompt', customPrompt);
            }

            this.iaGenerationService.getIAanswerFromPdf(formData, formType).subscribe(r => {
                console.log('PDF response:', r);
                this.dialog.closeAll();
                if (formType === 'fiche') {
                    this._router.navigateByUrl('/user/fiches/create', { state: { iaResponse: r } });
                } else if (formType === 'carte') {
                    this._router.navigateByUrl('/user/cartes/create', { state: { iaResponse: r } });
                } else if (formType === 'quiz') {
                    this._router.navigateByUrl('/user/quiz/create', { state: { iaResponse: r } });
                }
            });
        } else if (this.form.get('text')?.value) {
            // Traitement du texte
            const textData = {
                text: this.form.get('text')?.value,
                ...(formType === 'fiche' && this.form.get('promt')?.value && { customPrompt: this.form.get('promt')?.value })
            };

            this.iaGenerationService.getIAanswerFromText(textData, formType).subscribe(r => {
                console.log('Text response:', r);
                this.dialog.closeAll();

                // Ajout de la redirection pour 'fiche', 'carte', ou 'quiz'
                if (formType === 'fiche') {
                    this._router.navigateByUrl('/user/fiches/create', { state: { iaResponse: r } });
                } else if (formType === 'carte') {
                    this._router.navigateByUrl('/user/cartes/create', { state: { iaResponse: r } });
                } else if (formType === 'quiz') {
                    this._router.navigateByUrl('/user/quiz/create', { state: { iaResponse: r } });
                }
            });
        }

        // On réactive le formulaire une fois la soumission effectuée
        this.form.enable();
    }

    InfoPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
}
