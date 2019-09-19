import { MapAPIService } from './../map-api.service';
import { DataService } from './../data.service';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { toArray } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  public tableData: any;
  public showTable:boolean = false;
  public procedure: string;
  public sortOptions = ['Price: Low to High', 'Price: High to Low', 'Best match'];
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
  getData() {
    this.dataService.getDataWithCode().subscribe((data: {}) => {

      this.tableData = data;
      this.showTable = true;
      this.getProcedureName();
      this.getAddresses();


    });
  }

  getProcedureName() {

    // choose first item from list to get name - without number at start
    this.procedure = 'Displaying results for:' + (this.tableData[0].dRGDefinition).substring(5);

  }

  getAddresses() {
    //House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country
    let address: string;
    this.tableData.forEach(item => {
      address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode ;
      this.mapAPIService.getAddressGeolocation(address).then((location: Location) => {
        this.mapAPIService.getUserLocation().then((userLocation: Location) => {
          this.mapAPIService.getDistance(userLocation, location).then((distance: string) => {
            this.mapAPIService.addMarker(location.lat, location.lng, true, {
              markerName: item.providerName,
              markerPrice: item.averageTotalPayments,
              markerDistance: distance,
              markerAddress: item.providerStreetAddress
            });
          });
        });
      });
    });



  }

}

interface Location {
  lat: number,
  lng: number
}
