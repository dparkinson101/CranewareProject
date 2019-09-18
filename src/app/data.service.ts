import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

/*
This the data service - this is where data for the website is obtained via API (Express server - this connects to the database)
*/


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // location of Express Server
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
       // content type is set to JSON
      'Content-Type': 'application/json'
    })
  };


  /*Get data from the azure endpoint*/
  getData(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/test')
    .pipe(
      retry(1),
      catchError(this.handleError));
  }

  getTableData()
  {


  }


  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }




}
