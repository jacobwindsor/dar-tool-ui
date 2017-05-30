import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "app/home/home.component";
import {HelpComponent} from "./help/help.component";
import {CreateCompoundSetComponent} from "./create-compound-set/create-compound-set.component";

const appRoutes: Routes = [
  {
    path: 'compounds/create',
    component: CreateCompoundSetComponent,
  },
  // {
  //   path: 'compounds/:id',
  //   //component: PathwayComponent
  // },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

export const routes = RouterModule.forRoot(appRoutes);
