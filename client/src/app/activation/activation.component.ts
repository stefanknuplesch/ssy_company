import { Component, OnInit } from '@angular/core';
import {IEmployee} from "../employees/IEmployee";
import {WebService} from "../web.service";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  employees: IEmployee[] = [];
  constructor(private ws: WebService) { }

  ngOnInit(): void {
    this.loadEmps();
  }

  loadEmps(): void {
    this.ws.getEmployeesToActivate().subscribe(res => {
      this.employees = res;
    });
  }

  activateEmp(id: number): void {
    this.ws.postActivateEmployee(id).subscribe(res => {
      this.loadEmps();
    });
  }
}
