import { Component } from '@angular/core';
import { SiblingComunicService } from './services/sibling-comunic.service';

import { slideInAnimation } from 'src/animationts';
import { MatDialog} from '@angular/material/dialog';

import { DialogComponent } from './modules/Movies/dialog/dialog.component';
import { DataService } from './modules/core/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})

export class AppComponent {
  constructor(
    public sibCom: SiblingComunicService,
    public dialog: MatDialog,
    public data: DataService,
    private router: Router
  ) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goToCategory(id: string) {
    this.router.navigate(['movies', id]);
  }
}
