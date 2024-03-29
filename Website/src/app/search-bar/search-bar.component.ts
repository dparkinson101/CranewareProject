import { MatFormFieldModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteModule } from '@angular/material';
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


  filteredOptions: Observable<Procedure[]>;

  distances = [5, 10, 20, 50, 100, 200, 250, 500];
  states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];

  model = new item('', '', null, null, null, null, null, false);
  code: string;
  userLocation: string;
  minPrice: number;
  maxPrice: number;
  distanceRange: number;

  locationStatus:string='use current location';

  submitted = false;

  autocompleteLocation: any;
  autocompleteProcedure: any;
  userPlace: any;

  isGeolocating = false;

  procedureList: Procedure[] = [];
  procedureAutocomplete: any;

  newSearch() {

    this.dataService.getCode(this.model);
    this.initAutocomplete();
    this.reset();

  }

  redirect() {

    this.router.navigate(['./home']);

  }

  reset() {
    this.model = new item('', '', null, null, null, null, null, false);
    //console.log(this.autocompleteProcedure);
    this.autocompleteProcedure.value = '';
  }
  onSubmit() {
    this.submitted = true;
  }

  initAutocomplete(){
    //Address Auto Complete
    if(document.getElementById('location')){
      this.autocompleteLocation = new google.maps.places.Autocomplete(document.getElementById('location'), {types: ['geocode']});
      var self = this;
      this.autocompleteLocation.addListener('place_changed', function (mapAPI = self.mapAPIService){
        mapAPI.setUserPlace(this.getPlace());
      });
    }

    //Procedure Auto Complete
    this.autocompleteProcedure = document.getElementById('procedure');
  }

  onOver()
  {
    if(this.mapAPIService.userGeolocation === undefined){

      document.getElementById('geoButton').style.background = 'blue'; //(button colour when geo location off)
      document.getElementById('geoButton').style.borderColor = 'blue';
    }else
    {
      document.getElementById('geoButton').style.background = 'red'; //(button colour on hover after geo location on)
      document.getElementById('geoButton').style.borderColor = 'red';
    }
  }

  onOut()
  {
    if(this.mapAPIService.userGeolocation === undefined){

      // document.getElementById('geoButton').style.background = 'black'; //#007bff
      // document.getElementById('geoButton').style.borderColor = 'green'; //#007bff
    }else
    {
      document.getElementById('geoButton').style.background = 'green'; //(button colour after hover when geo location on)
      document.getElementById('geoButton').style.borderColor = 'green'; //#66bf48
    }

  }

  onGeoSelect(){
    this.initAutocomplete();
    if(this.mapAPIService.userGeolocation === undefined && this.isGeolocating == false){

      document.getElementById('geoButton').style.background = 'green'; //(button colour when when geo location on)
      document.getElementById('geoButton').style.borderColor = 'green'; //#66bf48
      this.isGeolocating = true;
      this.locationStatus= 'stop using current location';

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

        // console.log("removed geolocation marker");
      }

      document.getElementById('geoButton').style.background = 'blue'; //(button colour when geo location off)
      document.getElementById('geoButton').style.borderColor = 'blue'; //#66bf48
      this.locationStatus = 'use current location';
    }
  }

  autoCallBack(){
    this.userPlace = this.autocompleteLocation.getPlace();
    this.mapAPIService.setUserPlace(this.userPlace);
  }

  ngOnInit() {

    //this.dataService.currentSearch.subscribe(search => this.model = search);

    this.dataService.getProcedures().subscribe( async procedureResults => {
      procedureResults.forEach( item => {
        var procedureCode = <string> (item.dRGDefinition).substring(0, 3);
        var procedureName = <string> (item.dRGDefinition).substring(6, <string> (item.dRGDefinition).length);

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
    var filterValue = '';
    if (value.name === undefined){
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
          this.model.code = 'INVALID_PROCEDURE';
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
    if (filteredList.length === 0){
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
      return val ? val.name : val;

  }


  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}

interface Procedure {
    code: string,
    name: string
}
