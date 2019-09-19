import { MapAPIService } from './../map-api.service';
import { DataService } from './../data.service';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { toArray } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  public tableData: any;
  public showTable = false;
  public procedure: string;
  public sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];
  public states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  public headElements = [' ', 'Name', 'Distance', 'Cost'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService) {


  }


  ngOnInit() {

    // update when the search happens
    this.dataService.currentCode.subscribe(() => {
      this.getData();
    });
  }


  ngOnDestroy(): void {

  }
  getData() {
    this.mapAPIService.removeMarkers();
    this.dataService.getDataWithCode().subscribe((data: {}) => {

      this.tableData = data;
      this.showTable = true;
      this.getProcedureName();
      this.placeOnMap();


    });
  }

  getProcedureName() {

    // choose first item from list to get name - without number at start
    this.procedure = 'Displaying results for:' + (this.tableData[0].dRGDefinition).substring(5);

  }

  placeOnMap() {
    //House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country
    let address: string;
    this.tableData.forEach(item => {
      address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;
      this.mapAPIService.getAddressGeolocation(address).then((location: Location) => {
        console.log(location);
        this.mapAPIService.addMarker(location.lat, location.lng, true);

      });
    });

  }




}

interface Location {
  lat: number,
  lng: number
}


