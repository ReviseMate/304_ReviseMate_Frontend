import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProfPageComponent = class ProfPageComponent {
    constructor(studentService) {
        this.studentService = studentService;
        this.students = [];
        this.isModalOpen = false; // Variable pour contrôler l'ouverture de la modal
        this.selectedStudent = null; // Étudiant sélectionné à afficher dans la modal
    }
    // Récupère les étudiants
    ngOnInit() {
        this.studentService.getStudents().subscribe((data) => {
            console.log('Étudiants récupérés:', data); // Vérifie ce qui est récupéré
            this.students = data;
        }, (error) => {
            console.error('Erreur de récupération des étudiants:', error);
        });
    }
    // Ouvre la modal et sélectionne l'étudiant
    openModal(student) {
        this.selectedStudent = student;
        this.isModalOpen = true;
    }
    // Ferme la modal
    closeModal() {
        this.isModalOpen = false;
        this.selectedStudent = null;
    }
};
ProfPageComponent = __decorate([
    Component({
        selector: 'app-prof-page',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './prof-page.component.html',
        styleUrls: ['./prof-page.component.scss'],
        encapsulation: ViewEncapsulation.None
    })
], ProfPageComponent);
export { ProfPageComponent };
//# sourceMappingURL=prof-page.component.js.map