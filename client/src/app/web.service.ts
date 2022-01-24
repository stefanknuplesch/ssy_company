import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {IDepartment} from "./departments/IDepartment";
import {Observable} from "rxjs";
import {IEmployee} from "./employees/IEmployee";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  //-----------------
  // ADD DATA - DEPARTMENTS
  //-----------------
  getDepartments(): Observable<IDepartment[]>
  {
    const url = "http://localhost:4001/departments";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.get<IDepartment[]>(url, {headers, params});
  }

  postDepartment(dept: IDepartment): Observable<any>
  {
    const url = "http://localhost:4001/departments";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.post<any>(url, dept, {headers, params});
  }

  //-----------------
  // ADD DATA - EMPLOYEES
  //-----------------
  getEmployeesByDeptId(deptId: number): Observable<IEmployee[]>
  {
    const url = "http://localhost:4002/employees";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('departmentId', deptId);

    return this.http.get<IEmployee[]>(url, {headers, params});
  }

  postEmployee(emp: IEmployee): Observable<any>
  {
    const url = "http://localhost:4002/employees";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.post<any>(url, emp, {headers, params});
  }

  //-----------------
  // OVERVIEW
  //-----------------
  getOverview(): Observable<any>
  {
    const url = "http://localhost:4003/overview";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.get(url, {headers, params});
  }

  //-----------------
  // ACTIVATION
  //-----------------
  getEmployeesToActivate(): Observable<IEmployee[]>
  {
    const url = "http://localhost:4004/employees";
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.get<IEmployee[]>(url, {headers, params});
  }

  postActivateEmployee(id: number): Observable<any>
  {
    const url = "http://localhost:4004/employees/" + id;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams();

    return this.http.post(url, {headers, params});
  }

}
