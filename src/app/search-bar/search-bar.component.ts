import { DataService } from './../data.service';

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { item } from '../models/item';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(public dataService: DataService) {

  }

  sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];


  model = new item('');
  code: string;
  submitted = false;

  newSearch() {

    this.dataService.getRequest(this.model.code)
    console.log(this.model.code);
    this.reset();

  }

  reset() {
    this.model = new item('');

  }
  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {

    this.dataService.currentCode.subscribe(code => this.code = code)

  }

  


}
