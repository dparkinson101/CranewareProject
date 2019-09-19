import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class MapAPIService {

  map: any;
  markers: any[] = [];

  constructor() { }

  public createMap(latitude: number, longitude: number, zoomIn: number) {
    try {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: longitude, lng: latitude },
        zoom: zoomIn
      });
      console.log('Map created successfully');
    } catch (err) {
      console.log('Failed to create map. Is there an element with id \'map\' ?');
      console.log(err);
    }
  }

  public addMarker(latitude: number, longitude: number, focusOn: boolean) {
    try {
      const marker = new google.maps.Marker({ position: { lat: latitude, lng: longitude }, map: this.map });
      this.markers.push(marker);
      if (focusOn) {
        this.map.setCenter({ lat: latitude, lng: longitude });
      }
    } catch (err) {
      console.log('Could add marker on map: ' + this.map);
      console.log(err);
    }
  }

 

  public async getAddressGeolocation(locationAddress: string) {
    const geocoder = new google.maps.Geocoder();
    const request = { address: locationAddress };

    return new Promise(resolve => {
      geocoder.geocode(request, function (results, status) {
        if (status === 'OK') {
          console.log(results);
          const pos = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          resolve(pos);
        } else {
          console.log('Geocode Not Successful: ' + status);
          resolve(null);
        }
      });
    });
  }

  public async getUserLocation() {
    return new Promise(resolve => {
      //HTML 5 Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          resolve(pos);
        }, function () {
          console.log('This browser doesn\'t support HTML 5 Geolocation');
          resolve(null);
        });
      }
    });
  }


}
