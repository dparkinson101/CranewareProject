import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class MapAPIService {

  map: any;
  markers: any[] = [];

  constructor() { }

  public createMap(latitude: number, longitude: number, zoomIn: number){
    try{
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: longitude, lng: latitude},
        zoom: zoomIn
      });
    }
    catch(err){
      console.log("Failed to create map. Is there an element with id 'map' ?");
    }
  }

  public addMarker(latitude: number, longitude: number, focusOn: boolean){
    try{
      var marker = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: this.map});
      this.markers.push(marker);
      if(focusOn){
        this.map.setCenter({lat: latitude, lng: longitude});
      }
    }
    catch(err){
      console.log("Could add marker on map: " + this.map);
    }
  }

  public getAddressGeolocation(locationAddress: string){
    var geocoder = new google.maps.Geocoder();
    var request = {address: locationAddress};
    // var marker;
    geocoder.geocode(request, function(results, status){
      console.log(status);
      if(status === "OK")
      {
        return results[0].geometry.location;
      }
      else
      {
        console.log("Geocode Not Successful: " + status);
      }
    });
  }


}
