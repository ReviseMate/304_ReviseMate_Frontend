import { CreateCarteComponent } from "./create-carte/create-carte.component";
import { CartesComponent } from "./cartes.component";
import { EditCarteComponent } from "./edit-carte/edit-carte.component";
import { ReviserCarteMemoireComponent } from "../reviser-carte-memoire/reviser-carte-memoire.component";
export default [
    {
        path: 'create',
        component: CreateCarteComponent,
    },
    {
        path: '',
        component: CartesComponent,
    },
    {
        path: ':id',
        component: EditCarteComponent,
    },
    {
        path: 'reviser-carte/:id',
        component: ReviserCarteMemoireComponent,
    }
];
//# sourceMappingURL=cartes.routes.js.map