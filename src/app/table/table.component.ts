import { MapAPIService } from './../map-api.service';
import { DataService } from './../data.service';
import { LocationService } from './../location.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import { MatPaginator, MatSort, MatTableDataSource, MatTableModule, MatSliderModule } from '@angular/material';
import { Observable } from 'rxjs';


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

  public displayedColumns = ['Name', 'State', 'Zip', 'Cost'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService, private locationService: LocationService) {

  }


  ngOnInit() {

    this.isLoading = true;

    // update when the search happens
    this.dataService.currentCode.subscribe(() => {
      this.getData();

    });



  }

  async loadPage() {

    if (this.paginator === undefined) {
      return;
    }

    // remove markers
    this.mapAPIService.removeMarkers();

    // get page index and set start and end points for the adding markers
    let start = 0;
    let end = 0;

    if (this.paginator === undefined) {
      return;
    }

    // select the set of items from the data for the page

    const page = this.paginator.pageIndex;


    if (page === 0) {
      start = 0;
      end=10

    } else {
     start = (page * 10);
     end = (page *10 ) -10;

    }
  

    // for a  page add the markers to the map
    for (let i = start; i < end; i++) {

      const item = this.initialData[i];
      await this.sleep(750);
      this.placeOnMap(item);
    }

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getPosition(page: any, x: any, y: any ) {
    let position;

    if (page === 0) {
      position = x;

    } else {
      position = (page * 10) - y;

    }

    return position;

  }




  getData() {

    this.isLoading = true;

    const observable = this.dataService.getDataWithCode();

    if (observable === null) {
      return; // no data has been fetched
    }

    observable.subscribe(data => {

      this.processedData = [];
      this.initialData = [];
      this.initialData = data;
      this.showTable = true;

      this.getProcedureName();

      this.initialData.forEach(item => {
        this.processedData.push(this.createNewDataItem(item));

      });
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = [];
      this.dataSource.data = this.processedData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadPage();

      console.log('Table data is fetched');

    }
    );

    // Convert from observable to promise, and use 'then' when the subscribe is complete too
    observable.toPromise().then(() => this.isLoading = false); console.log('Table data is loaded');




  }

  getProcedureName() {

    // choose first item from list to get name - without number at start
    this.procedure = 'Displaying results for:' + (this.initialData[0].dRGDefinition).substring(5);

  }

  async placeOnMap(item: any) {

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
    // this.sleep(200).then(() => {
    //   this.locationService.getLocation(address).subscribe((data: any) => {

    //     console.log(data);
    //     var location = data.results[0].geometry.location;
    //INSERT CODE HERE
    //   });
    // });



  }



  createNewDataItem(item: any): TableData {
    const name = this.toTitleCase(item.providerName)
    return {
      providerName: name,
      State: item.providerState,
      Zip: item.providerZipCode,
      Cost: Number(item.averageTotalPayments),
    }

  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}

interface Location {
  lat: number;
  lng: number;
}

export interface TableData {

  providerName: string;
  State: string;
  Zip: string;
  Cost: number;
}
