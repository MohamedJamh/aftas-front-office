import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MembersComponent } from './components/dashboard/members/members.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoaderComponent } from './components/shared/loader/loader.component';
import {FormsModule} from "@angular/forms";
import { LevelsComponent } from './components/dashboard/levels/levels.component';
import { FishesComponent } from './components/dashboard/fishes/fishes.component';
import { CardComponent } from './components/shared/card/card.component';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { SiginComponent } from './components/auth/signin/sigin.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    MembersComponent,
    LoaderComponent,
    LevelsComponent,
    FishesComponent,
    CardComponent,
    CompetitionsComponent,
    HomeDashboardComponent,
    AuthComponent,
    SiginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
