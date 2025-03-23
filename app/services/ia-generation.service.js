import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
let IaGenerationService = class IaGenerationService {
    constructor() {
        this.http = inject(HttpClient);
        this.url = environment.url;
    }
    // Fonction pour obtenir la réponse de l'IA à partir d'un fichier PDF
    getIAanswerFromPdf(formData, type) {
        const endpoint = type === 'fiche'
            ? 'revision/pdf'
            : type === 'carte'
                ? 'flashcard/pdf'
                : 'quizzes/pdf';
        return this.http.post(`${this.url}/${endpoint}`, formData, { withCredentials: true });
    }
    // Fonction pour obtenir la réponse de l'IA à partir d'un texte
    getIAanswerFromText(textData, type) {
        const endpoint = type === 'fiche'
            ? 'revision'
            : type === 'carte'
                ? 'flashcard'
                : 'quizzes';
        const dataToSend = type === 'fiche'
            ? { text: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
            : type === 'carte'
                ? { content: textData.text, ...(textData.customPrompt && { customPrompt: textData.customPrompt }) }
                : { content: textData.text };
        return this.http.post(`${this.url}/${endpoint}`, dataToSend, { withCredentials: true });
    }
};
IaGenerationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IaGenerationService);
export { IaGenerationService };
//# sourceMappingURL=ia-generation.service.js.map