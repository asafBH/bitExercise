import { Injectable } from '@angular/core';
import { IAddMovie } from '../../Movies/models/movie';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  movieData$: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.movieData$ = new BehaviorSubject<any>({ category: [] });
    this.http.get('/assets/data.json').toPromise().then(
      (res: any[]) => {
        // Success
        this.movieData$.next(res);
      }
    );
  }

  getCategoryName(id: string): string {
    let title;
    (this.movieData$ as any).value.category.forEach((cat, index) => {
      if (cat.Id === id)
        title = cat.Title;
    })
    return title;
  }
  getMoviesByCategoryId(id: string) {
    return this.movieData$.pipe(
      map(mdata => {
        const movies = mdata.category.filter(cat => cat.Id === id);
        return movies.length > 0 ? mdata.category.filter(cat => cat.Id === id)[0].Movies.reverse() : [];
      })
    );
  }

  deleteMovieFromCategory(title: string, categoryid: string) {
    (this.movieData$ as any).value.category.forEach((cat) => {
      for (let i = 0; i < cat.Movies.length; i++) {
        if (cat.Movies[i].Title === title) {
          cat.Movies.splice(i, 1);
        }
      }
    })
    return console.log(`movie deleted: ${title}`);
  }

  getCategories() {
    return this.movieData$.pipe(
      map(mdata => (mdata.category.map(cat => {
        return {
          Id: cat.Id,
          Title: cat.Title,
          numOfMovies: cat.Movies.length
        };
      }))
      )
    );

  }

  addMovie(movie: IAddMovie) {
    let categoryFound = false;
    (this.movieData$ as any).value.category.forEach((cat, index) => {

      for (let i = 0; i < cat.Movies.length; i++) {
        if (cat.Movies[i].Title === movie.title) {
          return console.log('Movie already exist');
        }
      }

    }),
      (this.movieData$ as any).value.category.forEach((cat, index) => {
        if (cat.Title === movie.category) {
          cat.Movies.push({
            CategoryId: (index + 1).toString(),
            Image: movie.image,
            IMDBLink: movie.IMDBLink,
            Title: movie.title,
          });
          categoryFound = true;
        }
      });

    if (!categoryFound) {
      const newIndex = (this.movieData$ as any).value.category.length + 1;
      (this.movieData$ as any).value.category.push({
        Id: newIndex.toString(),
        Title: movie.category,
        Movies: [
          {
            CategoryId: newIndex.toString(),
            Image: movie.image,
            IMDBLink: movie.IMDBLink,
            Title: movie.title,
          }
        ]
      });
    }
    this.movieData$.next(this.movieData$.value);
    return of(true);
  }
}
