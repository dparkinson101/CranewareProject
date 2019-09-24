import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
     headers: new HttpHeaders({
       // content type is set to JSON
       'Content-Type': 'application/json'
     })
  };

  getLocation(address: string): Observable<any> {

    var apiURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyCRnV1YkfsCT_sjG7lJYLyhoBGxHO2U-Bw';

    return this.http.get<any>(apiURL);
  }
}
