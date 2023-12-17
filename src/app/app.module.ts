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
import { ServicesComponent } from './components/services/services.component';
import { CardComponent } from './components/shared/card/card.component';
import { RentalComponent } from './components/services/rental/rental.component';
import { CalendarComponent } from './components/services/rental/calendar/calendar.component';
import { EquipmentSelectionComponent } from './components/services/rental/equipment-selection/equipment-selection.component';
import { RentValidationComponent } from './components/services/rental/rent-validation/rent-validation.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { ReservationsComponent } from './components/dashboard/reservations/reservations.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';
import { CountdownTimerModule } from 'angular-countdown-timer';

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
    ServicesComponent,
    CardComponent,
    RentalComponent,
    CalendarComponent,
    EquipmentSelectionComponent,
    RentValidationComponent,
    OrdersComponent,
    CompetitionsComponent,
    ReservationsComponent,
    HomeDashboardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        CountdownTimerModule.forRoot()
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
