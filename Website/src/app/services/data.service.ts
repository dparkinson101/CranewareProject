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
  public zipcode: string;
  public state: string;
  public distanceRange: number;


  private searchSource = new BehaviorSubject(new item('', '', null, null, null, null, null));

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
    console.log(results);

    if(Object.keys(results).length > 0){
      var key = this.code + this.userLocation + this.minPrice + this.maxPrice + this.zipcode + this.state;
      this.cache.set(key, results);
      console.log(`adding results to cache for ${code}`);
    }
  }

  getHistoricData(id: string){
      let results;
      console.log(this.code);

      if(this.code != undefined && id != undefined){
          try {
            var key = this.code+id;
            
            if (this.cache.has(key)) {
              results = new Observable(observer => {
                observer.next(this.cache.get(key));
                observer.complete();
              });
              console.log(`results for code ${this.code} are in the cache`);
            } 
            else {
              results = this.http.get<any>(this.apiURL + '/historicdata?code=' + this.code + '&providerId=' + id);
              results.subscribe(res => {
                this.addToCache(key, res);
              });
            }
            return results;
          } 
          catch (err) {
            console.log(err);
            return null;
          }
      }
      else{
        return new Observable(observer => {
          observer.next([]);
          observer.complete();
        });
      }
  }

  getDataWithCode() {
    let results;
    if (this.code == '' || this.code == undefined || this.code == null || this.code === "INVALID_PROCEDURE" || this.userLocation == null) { 
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    try {
      var key = this.code + this.userLocation + this.minPrice + this.maxPrice + this.zipcode + this.state;
      
      if (this.cache.has(key)) {
        results = new Observable(observer => {
          observer.next(this.cache.get(key));
          observer.complete();
        });
        console.log(`results for code ${this.code} are in the cache`);
      } 
      else {
        results = this.http.get<any>(this.apiURL + '/comboQuery?code=' + this.code + '&max=' + this.maxPrice + '&min=' + this.minPrice + '&zipcode=' + this.zipcode + '&state=' + this.state);
        results.subscribe(res => {
          this.addToCache(key, res);
        });
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
    this.zipcode = search.zipcode;
    this.state = search.state;
    this.distanceRange = search.distanceRange;

    console.log(search);

    this.searchSource.next(search);
  }




  getProcedures(){
    let results;
    try{
      if(this.cache.has("procedureList")){
        results = new Observable(observer => {
          observer.next(this.cache.get("procedureList"));
          observer.complete();
        });
      }
      else{
        results = this.http.get<any>(this.apiURL + '/procedurelist');
        results.subscribe(res => {
          this.addToCache("procedureList", res);
        });
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
