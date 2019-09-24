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
    this.mapAPI.createMap(15.31, 16.34, 5);

    // //Add Marker Test
    // await this.mapAPI.getAddressGeolocation("USA").then((location: Location) => {
    //   console.log(location);
    //   this.mapAPI.addMarker(location.lat, location.lng, true);
    //   this.mapAPI.addMarker(location.lat + 4, location.lng + 5, true);
    //   this.mapAPI.addMarker(location.lat - 4, location.lng - 5, true);
    //   this.mapAPI.addMarker(location.lat + 4, location.lng - 5, true);
    //   this.mapAPI.addMarker(location.lat - 4, location.lng + 5, true);
    //   this.mapAPI.addMarker(location.lat + 2, location.lng + 2, true);
    // });

    // //Focus Marker Test
    // this.mapAPI.averageFocus();

    //Get User location Test
    // await this.mapAPI.getUserLocation().then((location: Location) => {
    //   console.log(location);
    //   this.mapAPI.addMarker(location.lat, location.lng, true);
    // });

    // //Focus Marker Test
    // this.mapAPI.averageFocus();
    //
    // //Remove Markers Test
    // this.mapAPI.removeMarkers();
  }
}

interface Location {
  lat: number,
  lng: number
}
