import { MapAPIService } from './../map-api.service';
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

  constructor(public dataService: DataService, public mapAPIService: MapAPIService) {

  }

  sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];


  model = new item('','');
  code: string;
  userLocation: string;
 
  submitted = false;

  newSearch() {

    this.dataService.getCode(this.model.code);
    this.dataService.getLocation(this.model.userLocation);
   
    this.reset();

  }

  reset() {
    this.model = new item('','');

  }
  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {

    this.dataService.currentCode.subscribe(code => this.code = code);
    this.dataService.currentLocation.subscribe(location => this.userLocation = location);
  }

}
