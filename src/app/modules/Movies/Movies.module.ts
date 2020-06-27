import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './Movies-routing.module';
import { MoviesComponent } from './movies/movies.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    DialogComponent,
    MoviesComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    FormsModule,

  ],
  exports:[],
  entryComponents: []
})
export class MoviesModule { }
