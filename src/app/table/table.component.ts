import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public tableData: any;
  public headElements = [' ', 'Name', 'Distance', 'Cost'];
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe((data: {}) => {

      this.tableData = data;

    });


  }
}

