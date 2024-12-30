/*  Name: Cham Kuen Chow
    Date Updated: Nov 28 2024
    Description: Child component nation-dialog for assignment 4
    Email: chowcham@sheridancollege.ca*/

import { Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WebService, City } from '../web.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,MatSortModule, MatSortable } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-nation-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule, MatIconModule,
            MatTableModule,MatSortModule,MatPaginatorModule ],
  templateUrl: './nation-dialog.component.html',
  styleUrl: './nation-dialog.component.css'
})
export class NationDialogComponent {
      name="";
      code=""; 
      code2=""; 
      continent=""; 
      region="";
      surfaceArea="";
      population="";
      mapURL="";
      cities: City[] = [];
      
      //Remove interface
      //cities: any;
      //dataSource = new MatTableDataSource();


      //get a reference to the MatSort, enable sorting in mat-table
      @ViewChild("sortCities") sortCities: MatSort | null = null;
      //get a reference to the MatPaginator, make paginator works in mat-table
      @ViewChild("pageCities") pageCities: MatPaginator | null = null;
      //creates a new instance of MatTableDataSource
      //it will be used to store the sorted and filtered cities data for template
      dataSource = new MatTableDataSource<City>();
      // columns to display
      // need to be same as json 
      headers = ["Name", "District", "Population"]; 
      // Inject dialog data and web service
      constructor(web: WebService, @Inject(MAT_DIALOG_DATA) data: any) {
      // Assign data from parent comp
      this.name=data.Name;
      this.code = data.Code;
      this.code2 = data.Code2;
      this.continent = data.Continent;
      this.region = data.Region;
      this.surfaceArea = data.SurfaceArea;
      this.population = data.Population;
      this.mapURL = "https://ejd.songho.ca/maps/"+this.code.toLocaleLowerCase()+".gif";
      // fetch JSON data
      web.getCities().subscribe({
      next: json => {
        //filter cities by matching city's CountryCode with country's Code
        this.cities = json.Cities.filter(c => c.CountryCode == this.code);
        //assign filtered cities to dataSource
        this.dataSource.data = this.cities;
        //assign sortCities (a MatSort instance referenced by @ViewChild) to the dataSource
        this.dataSource.sort=this.sortCities;
        //assign pageCities to the dataSource
        this.dataSource.paginator=this.pageCities;
        console.log(this.cities);
      },
      //display error message if there is error
      error: e => console.log(e.message)
      });
      }
}
