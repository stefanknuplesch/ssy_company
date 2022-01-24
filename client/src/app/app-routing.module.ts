import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {DepartmentsComponent} from "./departments/departments.component";
import {OverviewComponent} from "./overview/overview.component";
import {ActivationComponent} from "./activation/activation.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'departments',
    pathMatch: 'full'
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'activation',
    component: ActivationComponent
  },
  {
    path: '**',
    redirectTo: 'departments'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
