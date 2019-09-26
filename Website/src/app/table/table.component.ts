import { Location } from './../models/Location';
import { MapAPIService } from '../services/map-api.service';
import { DataService } from '../services/data.service';
import { LocationService } from '../services/location.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MatTableModule, MatSliderModule, PageEvent, MatTable } from '@angular/material';
import { TableData } from '../models/TableData';
import { item } from '../models/item';




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
  public sortOptions = ['Price: Low to High', 'Price: High to Low'];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns = ['providerName', 'providerState', 'providerZipCode', 'averageTotalPayments', 'providerDistance'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService, private locationService: LocationService,
              private titleCasePipe: TitleCasePipe) {

  }


  ngOnInit() {

    this.isLoading = true;

    // update when the search happens
    const observable = this.dataService.currentCode;

    observable.subscribe(() => {
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
      this.mapAPIService.getUserLocation().then((userLocation: Location) => {
        this.mapAPIService.getDistance(userLocation, location, address).then((distance: string) => {
          //console.log("location lat: " + location.lat + "\nlocation lng: " +location.lng );
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

    const observable = this.dataService.getDataWithCode();

    if (observable === null) {
      return; // no data has been fetched
    }

    observable.toPromise().then(async (data) => {
      this.processedData = [];
      this.initialData = [];
      this.initialData = data;
      this.showTable = true;

      this.getProcedureName();

      await this.initialData.forEach(async (item) => {
        await this.createNewDataItem(item).then((data: TableData) => {
          this.processedData.push(data);
        });
      });

      console.log(this.processedData);

      console.log('Table data is fetched');
      this.isLoading = false;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.processedData;
     
      await this.sleep(1);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // get the first page of results - make sure it is 10
      const page = this.getCurrent();
      if (page.length < 11) {
        this.placeCurrentOnMap(page);
        console.log(page);
      }
    });

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
            averageTotalPayments: item.averageTotalPayments,
            providerLatitude: item.latitude,
            providerLongitude: item.longitude,
            providerDistance: Number(distance)
          };
          resolve(data);
        });
      });
    });
  }

}
