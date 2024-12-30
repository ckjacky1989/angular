/*  Name: Cham Kuen Chow
    Date Updated: Nov 28 2024
    Description: Web Service for assignment 4
    Email: chowcham@sheridancollege.ca*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// define interface
// javascript don't have data type, json can contain unstructured obj
// json like this {"Countries": [{"Code":"ABW","Name":"Aruba",...},{...},...] }
export interface Country
{
Code: string;
Name: string;
Continent: string;
Region: string;
SurfaceArea: string;
Population: string;
Code2: string;
}
export interface CountryData
{
Countries: Country[]; // JOSN has a named array
}
// json like this {"Cities": 
//[{"ID":"1","Name":"Kabul","CountryCode":"AFG","District":"Kabol",
//"Population":"1780000"},{...},...] }
export interface City
{
Name: string;
CountryCode: string;
District: string;
Population: string;
}
export interface CityData
{
Cities: City[];
}
@Injectable({
  providedIn: 'root'
})
export class WebService {
  // inject HttpClient service
  constructor(private http: HttpClient) {
  }
  // get countries data, return observable object
  getCountries(): Observable<CountryData> {
  const URL = "https://ejd.songho.ca/syst24444/world/";
  return this.http.get<CountryData>(URL);
  }
  // get cities data, return observable object
  getCities(): Observable<CityData> {
  const URL = "https://ejd.songho.ca/syst24444/city";
  return this.http.get<CityData>(URL);
  }
}
// Remove interface
// export class WebService {
//   constructor(private http: HttpClient) {}

//   // get cities data, return observable object
//   getCities(): Observable<any> {
//     const URL = "https://ejd.songho.ca/syst24444/city";
//     return this.http.get<any>(URL);
//   }
// }