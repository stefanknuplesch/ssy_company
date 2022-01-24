import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  departments: any;
  constructor(private ws: WebService) { }

  ngOnInit(): void {
    this.ws.getOverview().subscribe( res => {
      this.departments = res;
    });
  }

}
