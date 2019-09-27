import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { retry, catchError, map, isEmpty } from 'rxjs/operators';
import { IOptions} from 'glob';
import { NgModel } from '@angular/forms';
import { item } from '../models/item';

/*
This the data service - this is where data for the website is obtained via API (Express server - this connects to the database)
*/


@Injectable({
  providedIn: 'root'
})

export class DataService {

  public cache;
  constructor(private http: HttpClient) {

    this.cache = new Map();
  }

  public code: any;
  public userLocation: any;
  public minPrice: number;
  public maxPrice: number;



  private searchSource = new BehaviorSubject(new item('', '', null, null));

  // the current code that has been typed into the search bar
  currentSearch = this.searchSource.asObservable();



  // location of Express Server
  apiURL = 'http://localhost:3000'; // THIS URL IS TO BE USED IF RUNNING SERVER LOCALLY
  // apiURL = 'http://134.36.36.224:3000'; // THIS URL IS TO BE USED IF ON LAB PC NETWORK


  httpOptions = {
    headers: new HttpHeaders({
      // content type is set to JSON
      'Content-Type': 'application/json'
    })
  };


  addToCache(code: any, results: any) {
    if(Object.keys(results).length > 0){
      this.cache.set(code, results);
      console.log(`adding results to cache for ${code}`);
    }
  }


  getDataWithCode() {

    let results;
    if (this.code === undefined || this.code === "INVALID_PROCEDURE") { 
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    try {
      if (this.cache.has(this.code)) {
        results = this.cache.get(this.code);
        console.log(`results for code ${this.code} are in the cache`);
      } 
      else {
        results = this.http.get<any>(this.apiURL + '/comboQuery?code=' + this.code + '&max=' + this.maxPrice + '&min=' + this.minPrice);
        this.addToCache(this.code, results);
      }
      return results;
    } 
    catch (err) {
      console.log(err);
      return null;
    }

  }

  /*Get the code a the search parameter*/
  getCode(search: item ) {
    this.code = search.code;
    this.userLocation = search.userLocation;
    this.minPrice = search.minPrice;
    this.maxPrice = search.maxPrice;

    this.searchSource.next(search);
  }




  getProcedures(){
    let results;
    try{
      if(this.cache.has("procedureList")){
        results = this.cache.get("procedureList");
      }
      else{
        results = this.http.get<any>(this.apiURL + '/procedurelist');
        this.addToCache("procedureList", results);
      }

      return results;
    }
    catch(err){
      console.log(err);
      return null;
    }
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
