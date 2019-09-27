import { MatFormFieldModule,MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteModule } from '@angular/material';
import { MapAPIService } from '../services/map-api.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { item } from '../models/item';
import { NgForm, FormControl } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { filter, startWith, map } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],

})



export class SearchBarComponent implements OnInit {

  constructor(public dataService: DataService, public mapAPIService: MapAPIService, public router: Router, private titlePipe: TitleCasePipe) {

  }

  myControl = new FormControl();

  objectOptions =
  [
    { name: 'angular'},
    {name:'angular matetial'},
  ];

  filteredOptions: Observable<Procedure[]>;

  sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];

  model = new item('', '');
  code: string;
  userLocation: string;

  submitted = false;

  autocompleteLocation: any;
  autocompleteProcedure: any;
  userPlace: any;

  isGeolocating = false;

  procedureList: Procedure[] = [];
  procedureAutocomplete: any;

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
    //console.log(this.autocompleteProcedure);
    this.autocompleteProcedure.value = '';

  }
  onSubmit() {
    this.submitted = true;
  }

  initAutocomplete(){
    //Address Auto Complete
    if(document.getElementById("location")){
      this.autocompleteLocation = new google.maps.places.Autocomplete(document.getElementById("location"), {types: ['geocode']});
      var self = this;
      this.autocompleteLocation.addListener('place_changed', function (mapAPI = self.mapAPIService){
        mapAPI.setUserPlace(this.getPlace());
      });
    }

    //Procedure Auto Complete
    this.autocompleteProcedure = document.getElementById("procedure");
  }

  onGeoSelect(){
    this.initAutocomplete();
    if(this.mapAPIService.userGeolocation === undefined){

      document.getElementById("geoButton").style.background = 'green';
      document.getElementById("geoButton").style.borderColor = 'green';
      this.isGeolocating = true;

      if(this.mapAPIService.userPlace !== undefined){ 
        this.mapAPIService.userPlace = undefined; 
      }
      this.mapAPIService.getUserLocation();
    }
    else{
      this.isGeolocating = false;
      this.mapAPIService.userGeolocation = undefined;

      if(this.mapAPIService.userMarker !== undefined){
        this.mapAPIService.userMarker.setMap(null);
        this.mapAPIService.userMarker = undefined;

        this.mapAPIService.map.setCenter({lat: 39.8283, lng: -95.7129});

        //console.log("removed geolocation marker");
      }

      document.getElementById("geoButton").style.background = '#007bff';
      document.getElementById("geoButton").style.borderColor = '#007bff';
    }
  }

  autoCallBack(){
    this.userPlace = this.autocompleteLocation.getPlace();
    this.mapAPIService.setUserPlace(this.userPlace);
  }

  ngOnInit() {

    this.dataService.currentCode.subscribe(code => this.code = code);
    this.dataService.currentLocation.subscribe(userLocation => this.userLocation = userLocation);
    this.dataService.getProcedures().subscribe( async procedureResults => {
      procedureResults.forEach( item => {
        var procedureCode = <string>(item.dRGDefinition).substring(0, 3);
        var procedureName = <string>(item.dRGDefinition).substring(6, <string>(item.dRGDefinition).length);

        var procedure = {
          code: procedureCode,
          name: this.titlePipe.transform(procedureName)
        };

        this.procedureList.push(procedure);
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: any): Procedure[] {
    var filterValue = "";
    if(value.name === undefined){
      filterValue = value.toLowerCase();

      //This means we have a search term string not an object
      if(value.length > 3){
        var finds = false;
        this.procedureList.forEach((item) => {
          if(item.name === value){
            this.model.code = item.code;
            finds = true;
            return;
          }
        });

        if(!finds){
          this.model.code = "INVALID_PROCEDURE";
        }
      }
      else{
        this.model.code = value;
      }
    }
    else{
      filterValue = value.name;
    }
    

    var filteredList = this.procedureList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    if(filteredList.length === 0){
      filteredList = this.procedureList.filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
    }

    return filteredList;
  }

  assignCode(procedure: Procedure){
    console.log(procedure);
    this.model.code = procedure.code;
  }

  displayFn(val: any)
  {
      return val? val.name : val;

  }
  

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  
}

interface Procedure {
    code: string,
    name: string
}
