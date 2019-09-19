import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TableComponent } from './table/table.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    TableComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
