import {Routes, RouterModule} from '@angular/router';
import {PathwayComponent} from './pathway/pathway.component';
import {SignUpOrSignInComponent} from "./sign-up-or-sign-in/sign-up-or-sign-in.component";
import {PathwayCreateComponent} from "./pathway-create/pathway-create.component";
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
  {
    path: 'pathway/create',
    component: PathwayCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pathway/:id',
    component: PathwayComponent
  },
  {
    path: 'signin',
    component: SignUpOrSignInComponent
  },
];

export const routes = RouterModule.forRoot(appRoutes);
