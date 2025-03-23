import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { TableauBordComponent } from "../tableau-bord/tableau-bord.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";
import { Component } from "@angular/core";
import { QuizComponent } from "../quiz/quiz.component";
import { FichesComponent } from "../fiches/fiches.component";
import { CartesComponent } from "../cartes/cartes.component";
let HomeComponent = class HomeComponent {
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        standalone: true,
        imports: [CommonModule, TableauBordComponent, HeaderComponent, RouterOutlet, HeaderComponent,
            QuizComponent, FichesComponent, CartesComponent],
        templateUrl: './home.component.html',
        styleUrl: './home.component.scss'
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map