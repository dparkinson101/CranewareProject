import { Observable } from 'rxjs';
import { Location } from './../models/Location';
import { MapAPIService } from '../services/map-api.service';
import { DataService } from '../services/data.service';
import { LocationService } from '../services/location.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule, MatSliderModule, PageEvent, MatTable } from '@angular/material';
import { TableData } from '../models/TableData';
import { item } from '../models/item';

declare var google: any;

export interface Element {
  providerName: string;
  averageTotalPayments: number;
  providerDistance: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public initialData: any;
  public processedData: TableData[] = [];
  public dataSource: MatTableDataSource<TableData>;
  public isLoading = true;
  public showSpinner = true;
  public showTable = false;
  public procedure: string;
  public distanceRange = 0;
  public moreInfoHistoricData: any = 0;

  public moreInfoItem: any = 0;
  public moreInfoPlaceDetails:  any = 0;
  public stars: number[] = [0, 0, 0, 0, 0];
  public reviews: string[] = [];
  public  iconClass = {
    0: 'fa fa-star-o',
    0.5: 'fa fa-star-half-o',
    1: 'fa fa-star'
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  public displayedColumns = ['providerName', 'averageTotalPayments', 'providerDistance', 'moreInfo'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService, private locationService: LocationService,
              private titleCasePipe: TitleCasePipe) {

  }


  ngOnInit() {

    this.isLoading = true;

    // update when the search happens
    const observable = this.dataService.currentSearch;

    observable.subscribe(() => {
      if(this.dataService.distanceRange != null){
        this.distanceRange = this.dataService.distanceRange;
        console.log(this.distanceRange);
      }
      this.getData();
    });



  }

  // --------------------------------------------------------------------------
  //               PAGING AND PLACING MARKERS FOR THOSE PAGES
  // Get current pages that are in the table with the connect method. Use these
  // values to place markers on the map, this means when a filter is typed in
  // markers are placed on the map for them. QUERY_LIMIT is still often reached
  // --------------------------------------------------------------------------

  getCurrent() {

    return this.dataSource.connect().value;

  }

  loadCurrent() {
    const page = this.getCurrent();
    this.placeCurrentOnMap(page);
  }

  placeCurrentOnMap(page: any) {
    this.mapAPIService.removeMarkers();
    page.forEach(item => {
      this.placeOnMap(item);
    });
  }

  loadMoreInfo(item: any){
    this.moreInfoItem = item;

    this.mapAPIService.getPlaceDetails(item.providerPlaceID).then(placeDetails => {
      this.moreInfoPlaceDetails = placeDetails;
      console.log(this.moreInfoPlaceDetails.rating);
      this.fillStars(Number(this.moreInfoPlaceDetails.rating));
      this.addReviews(this.moreInfoPlaceDetails.reviews);
    });

    this.dataService.getHistoricData(item.providerID).subscribe(data => {
        this.moreInfoHistoricData = data;
        console.log(data);
    });

    console.log(this.moreInfoItem);
  }

  async placeOnMap(item: any) {

    if( item.providerLongitude === undefined || item.providerLatitude === undefined ){
      const address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;
      this.mapAPIService.getAddressGeolocation(address).then((location: Location) => {
        this.mapAPIService.getUserLocation().then((userLocation: Location) => {
          this.mapAPIService.getDistance(userLocation, location, address).then((distance: string) => {
            this.mapAPIService.addMarker(location.lat, location.lng, true, {
              markerName: item.providerName,
              markerPrice: item.averageTotalPayments,
              markerDistance: distance,
              markerAddress: address
            }
            ).then(() => {
              this.mapAPIService.averageFocus();
              this.mapAPIService.labelMarkers();
            });
          });
        });
      });
    }
    else{
      var location = { lat: item.providerLatitude, lng: item.providerLongitude };
      const address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;

      if(this.mapAPIService.userPlace === undefined){

        this.mapAPIService.getUserLocation().then((userLocation: Location) => {
          this.mapAPIService.getDistance(userLocation, location, address).then((distance: string) => {
            this.mapAPIService.addMarker(location.lat, location.lng, false, {
              markerName: item.providerName,
              markerPrice: item.averageTotalPayments,
              markerDistance: distance,
              markerAddress: address
            }
            ).then(() => {
              this.mapAPIService.averageFocus();
              this.mapAPIService.labelMarkers();
            });
          });
        });
      }
      else{
        var userLocation = {
          lat: this.mapAPIService.userPlace.geometry.location.lat(),
          lng: this.mapAPIService.userPlace.geometry.location.lng()
        };
        this.mapAPIService.getDistance(userLocation, location, address).then((distance: string) => {
          this.mapAPIService.addMarker(location.lat, location.lng, false, {
            markerName: item.providerName,
            markerPrice: item.averageTotalPayments,
            markerDistance: distance,
            markerAddress: address
          }
          ).then(() => {
            this.mapAPIService.averageFocus();
            this.mapAPIService.labelMarkers();

            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

            if(this.mapAPIService.userMarker){
              if(this.mapAPIService.userMarker.location !== userLocation){
                this.mapAPIService.userMarker.setMap(null);
                this.mapAPIService.userMarker = undefined;

                this.mapAPIService.userMarker = new google.maps.Marker({
                  position: userLocation,
                  map: this.mapAPIService.map,
                  icon: image
                });
              }
            }
            else{
              this.mapAPIService.userMarker = new google.maps.Marker({
                position: userLocation,
                map: this.mapAPIService.map,
                icon: image
              });
            }
          });
        });
      }


    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  // --------------------------------------------------------------------------
  //                        WORKING WITH THE TABLE DATA
  // filters applied to the table are applied across all fields. In the get
  // data function this is where the data is taken from the data service, the
  // pages are set and the map markers are placed on the first page
  // --------------------------------------------------------------------------

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  async getData() {

    this.isLoading = true;
    this.procedure = 'Searching';

    const observable = this.dataService.getDataWithCode();

    if (observable === null) {
      return; // no data has been fetched
    }

    observable.toPromise().then(async (data) => {
      this.processedData = [];
      this.initialData = [];
      this.initialData = data;
      this.showTable = true;

      console.log(data);


      //Handles table if search yields no results
      if(this.initialData.length < 1){
        this.isLoading = false;
        this.procedure = 'No Results';
        if(this.dataSource !== undefined){
          this.dataSource.data = [];
          this.dataSource = undefined;
        }
        return;
      }
      else{
        console.log(this.initialData);
        this.procedure = 'Searching';
      }


      // this.initialData.forEach((item) => {
      //   this.createNewDataItem(item).then((data: TableData) => {
      //     this.processedData.push(data);
      //   });
      // });

      for (let index = 0; index < this.initialData.length; index++) {
        const item = this.initialData[index];
        await this.createNewDataItem(item).then((data: TableData) => {
          if(this.distanceRange == 0 || Number(data.providerDistance) < this.distanceRange){
            this.processedData.push(data);
          }
        });
      }

      console.log('Table data is fetched');
      this.isLoading = false;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.processedData;



      await this.sleep(1);

      this.dataSource.filterPredicate = (data: TableData, filter: string) => {
        if(data.providerName.toLowerCase().includes(filter)){
          return true;
        }
        else{
          return false;
        }
      };

      this.getProcedureName();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'providerDistance', start: 'asc', disableClear: false });


      // get the first page of results - make sure it is 10
      const page = this.getCurrent();
      if (page.length < 11) {
        this.placeCurrentOnMap(page);
        console.log(page);
      }
    });

  }

  async updateDistances(){

    this.isLoading = true;
    this.dataSource = undefined;
    this.dataSource.data = [];
    this.processedData = [];

    for (let index = 0; index < this.initialData.length; index++) {
      const item = this.initialData[index];
      await this.createNewDataItem(item).then((data: TableData) => {
        this.processedData.push(data);
      });
    }

    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.processedData;


    await this.sleep(1);

    this.isLoading = false;

    this.getProcedureName();

  }

  getProcedureName() {

    // choose first item from list to get name - without number at start
    this.procedure = 'Displaying results for:' + (this.initialData[0].dRGDefinition).substring(5);
  }

  async createNewDataItem(item: any) {
    const name = this.titleCasePipe.transform(item.providerName);
    const address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;

    return new Promise(resolve => {
      this.mapAPIService.getUserLocation().then((userPosition: Location) => {
        var pos = { lat: item.latitude, lng: item.longitude };
        this.mapAPIService.getDistance(userPosition, pos, address ).then((distance: string) => {
          var data = {
            providerName: name,
            providerState: item.providerState,
            providerCity: item.providerCity,
            providerZipCode: item.providerZipCode,
            providerStreetAddress: item.providerStreetAddress,
            averageTotalPayments: this.numberWithCommas(Number(item.averageTotalPayments).toFixed(2)),
            providerLatitude: item.latitude,
            providerLongitude: item.longitude,
            providerDistance: Number(distance).toFixed(2),
            providerID: item.providerId,
            providerPlaceID: item.google_place_id
          };
          resolve(data);
        });
      });
    });
  }

   numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


fillStars(rating: number){
  this.stars = [0,0,0,0,0];
  let starsToFill = Math.round(rating * 2)/2; //round to nearest 0.5
  let i = 0;
  while(starsToFill > 0.5){
    this.stars[i] = 1;
    i++;
    starsToFill--;

  }
  if(starsToFill === 0.5){
    this.stars[i] = 0.5;
  }
  this.stars.sort().reverse();
}


addReviews(reviews: any)
{

  this.reviews.push(reviews);

}

}
