import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/dashboard/members/users.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoaderComponent } from './components/shared/loader/loader.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LevelsComponent } from './components/dashboard/levels/levels.component';
import { FishesComponent } from './components/dashboard/fishes/fishes.component';
import { CardComponent } from './components/shared/card/card.component';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { SiginComponent } from './components/auth/signin/sigin.component';
import {NgOptimizedImage} from "@angular/common";
import {JwtInterceptor} from "./core/intreceptors/JwtInterceptor";
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';
import {NotFoundComponent} from "./components/error/notFound/notFound.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    LoaderComponent,
    LevelsComponent,
    FishesComponent,
    CardComponent,
    CompetitionsComponent,
    HomeDashboardComponent,
    AuthComponent,
    SiginComponent,
    SignupComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
