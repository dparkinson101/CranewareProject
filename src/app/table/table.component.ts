import { MapAPIService } from './../map-api.service';
import { DataService } from './../data.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';


import { MatPaginator, MatSort, MatTableDataSource, MatTableModule } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableData: any;
  public dataSource: MatTableDataSource<TableData>;
  public showTable = false;

  public procedure: string;
  public sortOptions = ['Price: Low to High', 'Price: High to Low'];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns = ['Name', 'State', 'Zip', 'Cost'];
  constructor(private dataService: DataService, private mapAPIService: MapAPIService) {


  }


  ngOnInit() {


    // update when the search happens
    this.dataService.currentCode.subscribe(() => {
      this.getData();

    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getData() {
    this.mapAPIService.removeMarkers();

    const dataForTable: TableData[] = [];
    this.dataService.getDataWithCode().subscribe((data: {}) => {

      this.tableData = data;
      this.showTable = true;
      this.getProcedureName();


      this.tableData.forEach(item => {

        dataForTable.push(this.createNewDataItem(item));

      });

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = dataForTable;


      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;



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
    console.log(this.tableData);
    this.tableData.forEach(item => {
      address = item.providerStreetAddress + ' ' + item.providerCity + ' ' + item.providerZipCode;
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
    });
  }



  createNewDataItem(item: any): TableData {
    var name = this.toTitleCase(item.providerName)
    return {
      Name: name,
      State: item.providerState,
      Zip: item.providerZipCode,
      Cost: Number(item.averageTotalPayments),
    }

  }


  ngAfterViewInit() {


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

  Name: string;
  State: string;
  Zip: string;
  Cost: number;
}
