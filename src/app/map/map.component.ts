import { Component, OnInit, ViewChild } from '@angular/core';
import { MapAPIService } from '../map-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private mapAPI: MapAPIService) {

  }

  ngOnInit() : void {
    this.mapAPI.createMap(15.31, 16.34, 5);
    this.mapAPI.addMarker(25.56, -75.43, true);
  }
}
