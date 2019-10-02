import { WavesModule, CarouselModule, ChartsModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './services/data.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableComponent } from './table/table.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule } from '@angular/material';
import { TitleCasePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TableComponent,
    MapComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatFormFieldModule,
    ChartsModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    BrowserAnimationsModule,
    CarouselModule,
    WavesModule,
    AppRoutingModule,
  ],
  providers: [
    DataService,
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
