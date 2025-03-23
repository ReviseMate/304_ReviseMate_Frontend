import { __decorate } from "tslib";
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UowService } from "../../../services/uow.service";
import { MatModule } from "../../../mat.modules";
import { RouterLink } from '@angular/router';
let CartesComponent = class CartesComponent {
    constructor() {
        this.uow = inject(UowService);
        this.user = JSON.parse(localStorage.getItem("user"));
        this.message = '';
        this.cartes = [];
    }
    ngOnInit() {
        let user = JSON.parse(localStorage.getItem("user"));
        this.uow.cartes.getAll().subscribe((res) => {
            if (res.success) {
                if (res.data.length == 0) {
                    this.message = "Aucune carte mémoire trouvée";
                }
                else {
                    // .filter((carte: CarteMemoire) => carte.id_utilisateur == user?.id)
                    this.cartes = res.data.filter((carte) => carte.id_utilisateur == user?.id);
                    console.log(this.cartes);
                }
            }
            else {
                console.log("No data fetched");
            }
        });
    }
    deleteCarte(id) {
        this.uow.cartes.delete(id).subscribe((res) => {
            console.log(res);
            this.ngOnInit();
        });
    }
};
CartesComponent = __decorate([
    Component({
        selector: 'app-cartes',
        standalone: true,
        imports: [CommonModule, MatModule, RouterLink],
        templateUrl: './cartes.component.html',
        styleUrls: ['./cartes.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], CartesComponent);
export { CartesComponent };
//# sourceMappingURL=cartes.component.js.map