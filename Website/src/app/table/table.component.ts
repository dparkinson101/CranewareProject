import { MapAPIService } from './../services/map-api.service';
import { Observable } from 'rxjs';
import { Location } from './../models/Location';
import { DataService } from '../services/data.service';
import { LocationService } from '../services/location.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule, MatSliderModule, PageEvent, MatTable, MatSortable } from '@angular/material';
import { TableData } from '../models/TableData';
import { item } from '../models/item';
import { element } from 'protractor';
import * as d3 from 'd3';

import 'chartjs-plugin-annotation';



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

  // Table Data
  public initialData: any;
  public processedData: TableData[] = [];
  public dataSource: MatTableDataSource<TableData>;
  public procedure: string;
  public distanceRange = 0;
  // Loading
  public isLoading = true;
  public showSpinner = true;
  public showTable = false;

  // Reviews & Historic Data
  public rating = 0;
  public photos = [];
  public moreInfoHistoricData: any = 0;
  public moreInfoItem: any = 0;
  public moreInfoPlaceDetails: any = 0;
  public stars: number[] = [0, 0, 0, 0, 0];
  public reviews = [];
  public iconClass = {
    0: 'fa fa-star-o ',
    0.5: 'fa fa-star-half-o ',
    1: 'fa fa-star '
  };
  public focused: boolean = false;
  public focusedNumber: number = 99;


  // graph

  @ViewChild('myCanvas', { static: false })
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;
  public dataSetOne = [];
  public dataSetTwo = [];
  public labels = [];




  // Paging and sorting for the table
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  public displayedColumns = ['providerName', 'averageTotalPayments', 'providerDistance', 'moreInfo'];
  chartReady: boolean = false;
  constructor(private dataService: DataService, private mapAPIService: MapAPIService, private locationService: LocationService,
    private titleCasePipe: TitleCasePipe) {

  }

  ngOnInit() {

    this.isLoading = true;

    // update when the search happens
    const observable = this.dataService.currentSearch;

    observable.subscribe(() => {
      if (this.dataService.code != undefined) {
        if (this.dataService.distanceRange != null) {
          this.distanceRange = this.dataService.distanceRange;
          console.log(this.distanceRange);
        }
        this.getData();
      }
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

  loadMoreInfo(item: any) {
    this.clearChart();
    this.chartReady = false;
    this.moreInfoItem = item;
    this.mapAPIService.getPlaceDetails(item.providerPlaceID).then(placeDetails => {
      this.moreInfoPlaceDetails = placeDetails;
      this.addStarRating(Number(this.moreInfoPlaceDetails.rating));
      this.addMoreDetails(this.moreInfoPlaceDetails);
    });

    this.dataService.getHistoricData(item.providerID).subscribe(data => {


      this.moreInfoHistoricData = data;

      this.clearChart();
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const cost = element.averageTotalPayments - element.averageMedicarePayments;
        this.dataSetOne.push(cost.toFixed(2));
        this.dataSetTwo.push(element.averageTotalPayments.toFixed(2));
        this.labels.push(element.years);

      }
      this.drawChart();
    });

  }

  markerZoom(i: number){
    i = i % 10;
    if (!this.focused){
      this.mapAPIService.markers[i].infoWindow.open(this.mapAPIService.map, this.mapAPIService.markers[i].marker);
      this.mapAPIService.map.setCenter(this.mapAPIService.markers[i].marker.position);
      this.mapAPIService.map.setZoom(15);
      this.focused = true;
      this.focusedNumber = i;
    }
    else{
      if (this.focusedNumber == i){
        this.mapAPIService.markers[i].infoWindow.close(this.mapAPIService.map, this.mapAPIService.markers[i]);
        this.mapAPIService.averageFocus();
        this.focused = false;
      }
      else{
        this.mapAPIService.markers[this.focusedNumber].infoWindow.close(this.mapAPIService.map, this.mapAPIService.markers[this.focusedNumber].marker);
        this.mapAPIService.averageFocus();
        this.focused = false;

        this.mapAPIService.markers[i].infoWindow.open(this.mapAPIService.map, this.mapAPIService.markers[i].marker);
        this.mapAPIService.map.setCenter(this.mapAPIService.markers[i].marker.position);
        this.mapAPIService.map.setZoom(15);
        this.focused = true;
        this.focusedNumber = i;
      }
    }
  }

  async placeOnMap(item: any) {

    if (item.providerLongitude === undefined || item.providerLatitude === undefined) {
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
    else {
      var location = { lat: item.providerLatitude, lng: item.providerLongitude };
      const address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;

      if (this.mapAPIService.userPlace === undefined) {

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
      else {
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

            var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

            if (this.mapAPIService.userMarker) {
              if (this.mapAPIService.userMarker.location !== userLocation) {
                this.mapAPIService.userMarker.setMap(null);
                this.mapAPIService.userMarker = undefined;

                this.mapAPIService.userMarker = new google.maps.Marker({
                  position: userLocation,
                  map: this.mapAPIService.map,
                  icon: image
                });

              }
            }
            else {
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


      // Handles table if search yields no results
      if (this.initialData.length < 1) {
        this.isLoading = false;
        this.procedure = 'No Results';
        if (this.dataSource !== undefined) {
          this.dataSource.data = [];
          this.dataSource = undefined;
        }
        return;
      }
      else {
        console.log(this.initialData);
        this.procedure = 'Searching';
      }


      for (let index = 0; index < this.initialData.length; index++) {
        const item = this.initialData[index];
        await this.createNewDataItem(item).then((data: TableData) => {
          if (this.distanceRange == 0 || Number(data.providerDistance) < this.distanceRange) {
            if (this.dataService.isInsured) {
              data.averageTotalPayments = Number((data.averageTotalPayments - item.averageMedicarePayments).toFixed(2));
            }
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
        if (data.providerName.toLowerCase().includes(filter)) {
          return true;
        }
        else {
          return false;
        }
      };

      this.getProcedureName();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // get the first page of results - make sure it is 10
      const page = this.getCurrent();
      if (page.length < 11) {
        this.placeCurrentOnMap(page);
        console.log(page);
      }

      await this.sleep(100);

      if (this.mapAPIService.circle == undefined) {
        // Add circle overlay and bind to marker
        this.mapAPIService.circle = new google.maps.Circle({
          map: this.mapAPIService.map,
          radius: (this.dataService.distanceRange * 1609.344),    // miles to metres
          fillColor: '#61b8ff',
          strokeWeight: 0.5,
          strokeColor: '#61b8ff'
        });
        this.mapAPIService.circle.bindTo('center', this.mapAPIService.userMarker, 'position');
      }
      else {
        this.mapAPIService.circle.setMap(null);
        this.mapAPIService.circle = undefined;

        // Add circle overlay and bind to marker
        this.mapAPIService.circle = new google.maps.Circle({
          map: this.mapAPIService.map,
          radius: (this.dataService.distanceRange * 1609.344),    // miles to metres
          fillColor: '#61b8ff',
          strokeWeight: 0.5,
          strokeColor: '#61b8ff'
        });
        this.mapAPIService.circle.bindTo('center', this.mapAPIService.userMarker, 'position');
      }

    });

  }

  getProcedureName() {

    // choose first item from list to get name - without number at start
    this.procedure = 'Displaying Results For: ' + this.titleCasePipe.transform(this.initialData[0].dRGDefinition).substring(5);
  }

  async createNewDataItem(item: any) {
    const name = this.titleCasePipe.transform(item.providerName);
    const address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;

    return new Promise(resolve => {
      this.mapAPIService.getUserLocation().then((userPosition: Location) => {
        var pos = { lat: item.latitude, lng: item.longitude };
        this.mapAPIService.getDistance(userPosition, pos, address).then((distance: string) => {
          var data = {
            providerName: name,
            providerState: item.providerState,
            providerCity: item.providerCity,
            providerZipCode: item.providerZipCode,
            providerStreetAddress: item.providerStreetAddress,
            averageTotalPayments: Number(item.averageTotalPayments).toFixed(2),
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



  /*-------------------------------------
     Add details to the pop up modal
  ---------------------------------------*/
  addMoreDetails(details: any) {

    // clear review and photo arrays
    this.reviews = [];
    this.photos = [];

    // add new reviews and photos
    // this.addReviews(details.reviews);
    // details.photos.forEach(photo => {
    //   this.photos.push(photo.getUrl());
    // });
    //this.addPhotos(details.photos)
  }

  addReviews(reviews: any) {
    reviews.forEach(review => {
      if (review.text !== "") {
        this.reviews.push(review);
      }
    });
  }
  addPhotos(photos: any) {
    photos.forEach(photo => {
      this.photos.push(photo.getUrl());
    });
  }

  // fill the stars according to rating
  addStarRating(rating: number) {
    this.stars = [0, 0, 0, 0, 0];
    let starsToFill = Math.round(rating * 2) / 2; // round to nearest 0.5
    this.rating = Math.round(rating * 2) / 2;
    let i = 0;
    while (starsToFill > 0.5) {
      this.stars[i] = 1;
      i++;
      starsToFill--;

    }
    if (starsToFill === 0.5) {
      this.stars[i] = 0.5;
    }
    this.stars.sort().reverse();
  }


  /*-------------------------------------
         other functions
  ---------------------------------------*/


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }



  drawChart() {
    this.chartData = [{
      data: this.dataSetOne.reverse(),
      label: 'With Medicare($)',
      fill: false
    },
    {
      data: this.dataSetTwo.reverse(),
      label: 'Without Medicare($)',
      fill: false
    }

    ];
    this.chartLabels = this.labels.reverse();
    this.chartColors = [{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)'
    }];
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            stepSize: (Number(Math.round(this.dataSetTwo[0] / 1000) * 1000) / 10)
          },
          scaleLabel: {
            display: true,
            labelString: 'Cost ($)'
          }
        }]
      },

    };

    this.chartReady = true;
  }

  clearChart()
  {
    this.dataSetOne = [];
    this.dataSetTwo = [];
    this.labels = [];
  }


}
