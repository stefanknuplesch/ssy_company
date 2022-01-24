import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import {IDepartment} from "./IDepartment";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: IDepartment[] = [];
  newDept: IDepartment = {} as IDepartment;
  selectedDeptId: number | undefined;
  constructor(private ws: WebService) { }

  ngOnInit(): void {
    this.ws.getDepartments().subscribe(res => {
      this.departments = res;
    });
  }

  setSelected(id: number): void {
    this.selectedDeptId = id;
  }

  unsetSelected(): void {
    this.selectedDeptId = undefined;
  }

  addDepartment(): void {
    this.ws.postDepartment(this.newDept)
      .subscribe(res => {
        this.newDept = {} as IDepartment;
        this.ngOnInit();
      });
  }

}
