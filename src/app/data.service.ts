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

  private codeSource = new BehaviorSubject('default');

  // the current code that has been typed into the search bar
  currentCode = this.codeSource.asObservable();



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

  getDataWithCode(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/silva?code=' + this.code)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }

  /*Get the code as the search parameters*/
  getRequest(code: string) {
    this.code = code;
    this.codeSource.next(code);
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
