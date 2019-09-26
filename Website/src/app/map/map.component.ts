import { Component, OnInit, ViewChild } from '@angular/core';
import { MapAPIService } from '../services/map-api.service';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private mapAPI: MapAPIService) {}

  ngOnInit() : void {
    this.handleMapSetUp();
  }

  async handleMapSetUp(){
    this.mapAPI.createMap(39.8283, -95.7129, 4);
  }
}

interface Location {
  lat: number,
  lng: number
}
