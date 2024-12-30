/*  Name: Cham Kuen Chow
    Date Updated: Nov 28 2024
    Description: Child component about-dialog for assignment 4
    Email: chowcham@sheridancollege.ca*/

    import { Inject } from '@angular/core';
    import { MatButtonModule } from '@angular/material/button';
    import { MatDialogModule } from '@angular/material/dialog';
    import { MAT_DIALOG_DATA } from '@angular/material/dialog';
    import { Component } from '@angular/core';
    import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule, MatIconModule ],
  templateUrl: './about-dialog.component.html',
  styleUrl: './about-dialog.component.css'
})
export class AboutDialogComponent {
      // About content from the parent component
      aboutContent = ""; 
      // Inject dialog data
      constructor(@Inject(MAT_DIALOG_DATA) data: any) {
      // Assign data from parent component
      this.aboutContent = data.aboutContent; 
      }
}
