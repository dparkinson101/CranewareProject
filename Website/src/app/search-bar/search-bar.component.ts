import { MatFormFieldModule,MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteModule } from '@angular/material';
import { MapAPIService } from '../services/map-api.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { item } from '../models/item';
import { NgForm, FormControl } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],

})



export class SearchBarComponent implements OnInit {

  constructor(public dataService: DataService, public mapAPIService: MapAPIService, public router: Router) {

  }
   myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  objectOptions =
  [
    { name: 'angular'},
    {name:'angular matetial'},

{name: 'react'
    },


  ];



  sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];



  model = new item('', '');
  code: string;
  userLocation: string;

  submitted = false;

  autocomplete: any;
  userPlace: any;

  newSearch() {

    this.dataService.getCode(this.model.code);
    this.dataService.getLocation(this.model.userLocation);

    this.reset();

  }

  redirect() {

    this.router.navigate(['./home']);

  }

  reset() {
    this.model = new item('', '');

  }
  onSubmit() {
    this.submitted = true;
  }

  initAutocomplete(){
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById("location"), {types: ['geocode']});
    var self = this;
    this.autocomplete.addListener('place_changed', function (mapAPI = self.mapAPIService){
      mapAPI.setUserPlace(this.getPlace());
    });
  }

  autoCallBack(){
    this.userPlace = this.autocomplete.getPlace();
    this.mapAPIService.setUserPlace(this.userPlace);
    console.log();
  }

  ngOnInit() {

    this.dataService.currentCode.subscribe(code => this.code = code);
    this.dataService.currentLocation.subscribe(userLocation => this.userLocation = userLocation);
  }

}
