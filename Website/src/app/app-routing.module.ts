import { AboutComponent } from './about/about.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HomeComponent } from './home/home.component';
import {SearchBarComponent  } from './search-bar/search-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{path: 'home', component: HomeComponent},
                        {path: 'search-page', component: SearchPageComponent},
                        {path: 'about', component: AboutComponent},
                        { path: '**', redirectTo: 'home', pathMatch: 'full' }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
