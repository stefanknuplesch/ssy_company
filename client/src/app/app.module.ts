import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {ActivationComponent} from "./activation/activation.component";
import {EmployeesComponent} from "./employees/employees.component";
import {DepartmentsComponent} from "./departments/departments.component";
import {OverviewComponent} from "./overview/overview.component";

@NgModule({
  declarations: [
    AppComponent,
    ActivationComponent,
    EmployeesComponent,
    DepartmentsComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
