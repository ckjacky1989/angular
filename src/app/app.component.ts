/*  Name: Cham Kuen Chow
    Date Updated: Nov 28 2024
    Description: Component for assignment 4
    Email: chowcham@sheridancollege.ca*/

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebService, Country } from './web.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';

import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { NationDialogComponent } from './nation-dialog/nation-dialog.component';

import { MatRadioModule } from '@angular/material/radio';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  standalone: true,
  // For template
  imports: [RouterOutlet, FormsModule, MatTableModule,MatIconModule,
    MatDialogModule,MatButtonModule,MatRadioModule,
    MatSortModule,MatCardModule,
    CommonModule,MatToolbarModule,MatCheckboxModule,MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // array to store JSON
  countries: Country[]=[];

  openAbout: boolean = false; 
  aboutContent: string="";
  //creates a new instance of MatTableDataSource
  //it will be used to store the sorted or filtered countries data for template
  dataSource = new MatTableDataSource<Country>();
  // store continent chosen by users
  option = "";

  isChecked1 = true;
  isChecked2 = true;
  isChecked3 = true;
  selected = "";
  state="";
  // @ViewChild("sortCountries") sortCountries: MatSort | null = null;
  // Inject dialog data and web service
  constructor(web: WebService, public dialog: MatDialog){
    // fetch JSON data
    web.getCountries().subscribe({
      next: json => {//sort countries by Name in ascending order and store it in countries 
                    this.countries=json.Countries.sort((a, b) => a.Name.localeCompare(b.Name))
                    //assign sorted countries to dataSource
                    this.dataSource.data=json.Countries;
                    //assigns sortCountries (a MatSort instance referenced by @ViewChild) to the dataSource
                    // this.dataSource.sort=this.sortCountries;
                    },
      //display error message if there is error
      error: e => console.log(e.message)
    });
    
  }
  //generate the url of flag image
  getFlagImage(code: string){
    return "https://ejd.songho.ca/flags/"+code.toLocaleLowerCase()+".jpg";
  };
  //open nation dialog by passing a nation 
  openNationDialog(nation: any)
  {
  // Initiate dialog config
  let config = new MatDialogConfig();
  config.width = "80vw";
  // assign nation to config
  config.data = nation;
  // open dialog with NationDialogComponent and data
  this.dialog.open(NationDialogComponent, config);
  }

  openAboutDialog()
  {
  // Initiate dialog config
  let config = new MatDialogConfig();
  // Define the about content
  this.aboutContent="This application is a standalone application with the "+ 
                "usage of different angular material such as Material Card and Material Dialog "+ 
                "to load the list of countries remotely and to display their national flags with names. "+ 
                "The country data is available at https://ejd.songho.ca/syst24444/world/ as a JSON format "+ 
                "and contains a named array of 239 countries. This app is developed by Angular "+
                "framework and Angular Material, version 18.";
  config.width = "50vw";
  // Assign aboutContent to config
  config.data = { aboutContent: this.aboutContent }; 
  // open dialog with AboutDialogComponent and data
  this.dialog.open(AboutDialogComponent, config);
  }
  
  //filter countries by using option chosen by users
  filterCountries() {
    if (this.option == 'All') {
      //display all countries if user chooses "All"
      this.dataSource.data = this.countries; 
    } else {
      //otherwise display countries by matching their Continent with option
      this.dataSource.data = this.countries.filter(
        c => c.Continent.toLocaleLowerCase() == this.option.toLocaleLowerCase());
      // this.dataSource.filter = this.option;
    }
  }
  // chk3states(){
  //   if (this.isChecked1 && this.isChecked2 && this.isChecked3)
  //       {this.state=}
  //   this.state;
  //   this.isChecked;
  // }
}