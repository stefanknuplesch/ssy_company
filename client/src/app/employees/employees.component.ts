import {Component, Input, OnInit} from '@angular/core';
import {IDepartment} from "../departments/IDepartment";
import {WebService} from "../web.service";
import {IEmployee} from "./IEmployee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @Input() deptId: number | undefined;
  newEmp: IEmployee = {} as IEmployee;
  employees: IEmployee[] = [];
  constructor(private ws: WebService) { }

  ngOnInit(): void {
    this.loadEmps();
  }

  ngOnChanges(): void {
    this.loadEmps();
  }

  addEmployee(): void {
    this.newEmp.deptId = this.deptId!;
    this.ws.postEmployee(this.newEmp)
      .subscribe(res => {
        this.newEmp = {} as IEmployee;
        this.loadEmps();
      });
  }

  loadEmps(): void {
    this.ws.getEmployeesByDeptId(+this.deptId!).subscribe(res => {
      console.log(res);
      this.employees = res;
    });
  }
}
