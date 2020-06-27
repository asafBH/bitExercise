import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { SiblingComunicService } from './services/sibling-comunic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './modules/core/data/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { MoviesModule } from './modules/Movies/Movies.module';
import { DialogComponent } from './modules/Movies/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MoviesModule,
    AppRoutingModule,
  ],
  providers: [
    SiblingComunicService,
    DataService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
