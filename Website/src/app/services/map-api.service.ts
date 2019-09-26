import { Injectable } from '@angular/core';
import { resolve } from 'url';

declare var google: any;

@Injectable({
  providedIn: 'root'
})

export class MapAPIService {

  map: any;
  markers: MarkerAndInfo[] = [];
  infoWindows: any[] = [];

  userPlace: any;
  userMarker: any;

  constructor() { }

  public createMap(latitude: number, longitude: number, zoomIn: number) {
    try {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: zoomIn
      });
      console.log('Map created successfully');
    } catch (err) {
      console.log('Failed to create map. Is there an element with id \'map\' ?');
      console.log(err);
    }
  }

  public async addMarker(latitude: number, longitude: number, focusOn: boolean, info: markerInformation) {
    try {
      const marker = new google.maps.Marker({
         position: { lat: latitude, lng: longitude },
         map: this.map
       });

      const infoWindow = new google.maps.InfoWindow({
        content: "<b>"+ this.titleCase(info.markerName) +"</b>" + "<br><b>Price:</b> $" + info.markerPrice + "<br><b>Distance:</b> " + info.markerDistance + "<br><b>Address:</b> " + this.titleCase(info.markerAddress)
      });

      marker.addListener("click", ()=>{
        infoWindow.open(this.map, marker);
        this.map.setCenter(marker.position);
        this.map.setZoom(15);
      });

      infoWindow.addListener("closeclick", ()=>{
        this.averageFocus();
      });

      this.infoWindows.push(infoWindow);
      this.markers.push({marker, info, infoWindow});

      if (focusOn) {
        this.map.setCenter({ lat: latitude, lng: longitude });
      }
    } catch (err) {
      console.log('Could not add marker on map: ' + this.map);
      console.log(err);
    }
  }

  public labelMarkers(){
    this.markers.sort((a, b) => {
      var distanceA = parseFloat(a.info.markerDistance);
      var distanceB = parseFloat(b.info.markerDistance);

      if(distanceA > distanceB){
        return 1;
      }
      if(distanceB > distanceA) {
        return -1;
      }
      if(distanceA == distanceB) {
        return 0;
      }
    });

    this.markers.forEach(m => {
      m.marker.setLabel(""+(this.markers.indexOf(m)+1));
    });
  }

  public removeMarkers(){
    try{
      this.markers.forEach(marker => {
        marker.marker.setMap(null);
      });
      this.markers = [];
      this.infoWindows = [];
    }
    catch(err){
      console.log("Error Removing Markers From: " + this.markers);
      console.log(err);
    }
  }

  public averageFocus(){
    try{
      var mapBounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => {
        mapBounds.extend(marker.marker.getPosition());
      });

      this.map.fitBounds(mapBounds);
    }
    catch(err){
      console.log("Failed to average the focus of the map: " + this.map);
      console.log(err);
    }
  }

  public focusProvider(){

  }

  public setUserPlace(place: any){
    this.userPlace = place;
    console.log(place);
  }

  public async getAddressGeolocation(locationAddress: string) {
    const geocoder = new google.maps.Geocoder();
    const request = { address: locationAddress };

    return new Promise(resolve => {
      console.log(this.userPlace);
        geocoder.geocode(request, function (results, status) {
          if (status === 'OK') {
            const pos = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };

            resolve(pos);
          } else {
            console.log('Geocode Not Successful: ' + status);
            resolve({lat: 0, lng: 0});
          }
        });
    });
  }

  public async getDistance(userPosition: Position, locationPosition: Position, destinationAddress: string){
    // var distanceMatrixService = new google.maps.DistanceMatrixService();
    // var request = {
    //   avoidFerries: false,
    //   avoidHighways: false,
    //   avoidTolls: false,
    //   destinations: [locationPosition],
    //   origins: [userPosition],
    //   travelMode: google.maps.TravelMode.DRIVING
    // };

    return new Promise(resolve => {

      var userPos = new google.maps.LatLng(userPosition.lat, userPosition.lng);
      var locationPos = new google.maps.LatLng(locationPosition.lat, locationPosition.lng);
      var rawDistance = google.maps.geometry.spherical.computeDistanceBetween(userPos, locationPos);

      var betterDistance = ""+(rawDistance / 1000).toFixed(2)

      resolve(betterDistance);

      // distanceMatrixService.getDistanceMatrix(request, function(results, status){
      //   if(status === 'OK'){
      //     //console.log(results);
      //     if(results.rows[0].elements[0].status === 'OK'){
      //       resolve(results.rows[0].elements[0].distance.text);
      //     }
      //     else{
            
      //     }
      //   }
      //   else{
      //     console.log("Distance Matrix request failed: " + status);
      //     resolve(null);
      //   }
      // });
    });
  }

  public async getUserLocation() {

    if(this.userMarker){
      this.userMarker.setMap(null);
      this.userMarker = undefined;
    }

    return new Promise(function(resolve) {
      if(this.userPlace === undefined){
        //HTML 5 Geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
    
            this.userMarker = new google.maps.Marker({
              position: pos,
              map: this.map,
              label: "You"
            });
  
            resolve(pos);
          }, function () {
            console.log('This browser doesn\'t support HTML 5 Geolocation');
          });
        }
      }
      else{
  
        const geocoder = new google.maps.Geocoder();
        const request = { address: this.userPlace.formatted_address };
  
        console.log("Inside the else");
        console.log(this.userPlace);
  
        const pos = {
          lat: this.userPlace.geometry.location.lat(),
          lng: this.userPlace.geometry.location.lng()
        };
  
        this.userMarker = new google.maps.Marker({
          position: pos,
          map: this.map,
          label: "You"
        });
  
        resolve(pos);
      }
    }.bind(this));
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }
}

interface Position{
  lat: number,
  lng: number
}

interface MarkerAndInfo{
  marker: any,
  info: markerInformation,
  infoWindow: any
}

interface markerInformation {
  markerName: string,
  markerAddress: string,
  markerDistance: string,
  markerPrice: string
}
