import { Routes } from "@angular/router";

import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { QuizComponent } from "./quiz.component";
// import { ProfileComponent } from "./profile/profile.component";

export default [

    {
        path: '',
        component: QuizComponent,

    },
    {
        path: 'create',
        component: CreateQuizComponent,

    }
] as Routes;
