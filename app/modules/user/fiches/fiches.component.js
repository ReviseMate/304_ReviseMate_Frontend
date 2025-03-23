import { __decorate } from "tslib";
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from "../../../mat.modules";
import { UowService } from "../../../services/uow.service";
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
let FichesComponent = class FichesComponent {
    constructor() {
        this.uow = inject(UowService);
        this.sanitizer = inject(DomSanitizer);
        this.message = '';
        this.user = JSON.parse(localStorage.getItem("user"));
        this.fiches = [];
    }
    ngOnInit() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.uow.fiches.getAll().subscribe((res) => {
            if (res.success) {
                if (res.data.length == 0) {
                    this.message = "Aucune fiche trouvée";
                }
                else {
                    let userFiches = res.data.filter(fiche => fiche.id_utilisateur == user.id);
                    this.fiches = userFiches.map((fiche) => {
                        fiche.contenu = this.removeHtmlTags(fiche.contenu.toString()); // Supprime les balises HTML
                        return fiche;
                    });
                }
            }
            else {
                console.log("No data fetched");
            }
        });
    }
    removeHtmlTags(html) {
        if (!html)
            return ''; // Vérifie si html est null ou undefined
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.innerText; // Récupère uniquement le texte sans les balises
    }
    deleteFiche(id) {
        this.uow.fiches.delete(id).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
};
FichesComponent = __decorate([
    Component({
        selector: 'app-fiches',
        standalone: true,
        imports: [CommonModule, MatModule, RouterLink],
        templateUrl: './fiches.component.html',
        styleUrls: ['./fiches.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], FichesComponent);
export { FichesComponent };
//# sourceMappingURL=fiches.component.js.map