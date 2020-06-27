import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../core/data/data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export const urlCheckValidator = (httpClient: HttpClient) => (c: FormControl) => {
  if (!c || String(c.value).length === 0) {
    return of(null);
  }

  return httpClient.get((String(c.value)), { observe: 'response', responseType: 'text' }).pipe(
    map(responseData => {
      if( responseData.ok ){
        return null ;
      }

    }), catchError(err => {
      return of({ err });
    }))
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  selected = '';
  public addMovie: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService, private http: HttpClient) {
    this.addMovie = new FormGroup({
      category: new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]),
      image: new FormControl('', Validators.required, urlCheckValidator(this.http)),
      IMDBLink: new FormControl('', [Validators.required, Validators.pattern(/https:\/\/(?:.*\.|.*)imdb.com\/(?:t|T)itle(?:\?|\/)(..\d+)/i)], urlCheckValidator(this.http)),
    });
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    this.addMovie.controls['category'].setValue(this.selected);
    this.dataService.addMovie(this.addMovie.value);
    this.dialogRef.close(true);
  }

}
