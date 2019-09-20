import { MapAPIService } from './../map-api.service';
import { DataService } from './../data.service';
import { LocationService } from './../location.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public initialData: any;
  public processedData: TableData[] = [];
  public dataSource: MatTableDataSource<TableData>;
  public showTable = false;
  public procedure: string;
  public sortOptions = ['Price: Low to High', 'Price: High to Low'];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns = ['Name', 'State', 'Zip', 'Cost'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService, private locationService: LocationService) {

  }


  ngOnInit() {

    console.log("Table Inits");

    // update when the search happens
    this.dataService.currentCode.subscribe(() => {
      this.getData();

    });

  }

  async loadPage() {
    if(this.paginator === undefined){
      return;
    }

    // remove markers
    this.mapAPIService.removeMarkers();

    // get page index and set start and end points for the adding markers
    const page = this.paginator.pageIndex;
    let start;
    let end;

    if (page === 0) {
      start = 0;
      end = 10;
    } else {
      start = (page * 10) - 10;
      end = (page * 10);
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

  getData() {

    var observable = this.dataService.getDataWithCode();

    if(observable === null){return;}

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
      this.dataSource.data = this.processedData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadPage();
    });
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
