import { Component } from '@angular/core';
import { DataService } from 'src/app/modules/core/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(public data: DataService, private router: Router) { }

  goToCategory(id: string) {
    this.router.navigate(['movies', id]);
  }
}
