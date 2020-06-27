import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from 'src/app/modules/Movies/models/movie';
import { DataService } from '../../core/data/data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieData: IMovie;

  categoryName: string;
  constructor(public data: DataService) { }

  ngOnInit() {
    this.categoryName =  this.data.getCategoryName(this.movieData.CategoryId);
  }

  deleteMovie(){
   this.data.deleteMovieFromCategory(this.movieData.Title, this.movieData.CategoryId);
  }
}
