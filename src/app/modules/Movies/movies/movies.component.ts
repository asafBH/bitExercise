import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/modules/core/data/data.service';
import { IMovie } from 'src/app/modules/Movies/models/movie';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, flatMap } from 'rxjs/operators'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  moviesList: IMovie[] = [];
  catId: string;
  private dataSub: Subscription;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.dataSub = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        this.catId = params.get('catId');
        return params.get('catId');
      }),
      flatMap(catId => this.data.getMoviesByCategoryId(catId))
    )
      .subscribe(res => this.moviesList = res);
  }

  goToProduct(movie: IMovie) {
    this.router.navigate(['product', this.catId, movie.Title]);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}
