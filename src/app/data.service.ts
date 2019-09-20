import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/*
This the data service - this is where data for the website is obtained via API (Express server - this connects to the database)
*/


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {

  }

  public code: any;
  public userLocation: any;


  private codeSource = new BehaviorSubject('default');
  private locationSource = new BehaviorSubject('default');
  // the current code that has been typed into the search bar
  currentCode = this.codeSource.asObservable();
 currentLocation = this.locationSource.asObservable();


  // location of Express Server
   apiURL = 'http://localhost:3000'; // THIS URL IS TO BE USED IF RUNNING SERVER LOCALLY
  // apiURL = 'http://134.36.36.224:3000'; // THIS URL IS TO BE USED IF ON LAB PC NETWORK


  httpOptions = {
    headers: new HttpHeaders({
      // content type is set to JSON
      'Content-Type': 'application/json'
    })
  };

  /*Get data from the test endpoint*/
  getData(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/azure')
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  /*Request data for a specific code i.e send parameters

  CHANGE ENDPOINT FOR DIFFERENT DATABASES --> auzre or silva

  */

  getDataWithCode() {
    // if(this.code !== undefined && this.userLocation !== undefined){

      return this.http.get<any>(this.apiURL + '/sortpriceasc?code=' + this.code + '&location=' + this.userLocation)
      .pipe(
        retry(1),
        catchError(this.handleError));



  }

  /*Get the code a the search parameter*/
  getCode(code: string) {
    this.code = code;
    this.codeSource.next(code);
  }

  /*Get the location as a search parameter*/
  getLocation(location: string) {
    this.userLocation = location;
    this.codeSource.next(location);
  }




  /*handle both server side and client errors*/
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }




}
