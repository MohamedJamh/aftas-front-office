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
import { EquipmentFamilyComponent } from './components/dashboard/equipment-family/equipment-family.component';
import { EquipmentsComponent } from './components/dashboard/equipments/equipments.component';
import { ServicesComponent } from './components/services/services.component';
import { CardComponent } from './components/shared/card/card.component';
import { RentalComponent } from './components/services/rental/rental.component';
import { CalendarComponent } from './components/services/rental/calendar/calendar.component';
import { EquipmentSelectionComponent } from './components/services/rental/equipment-selection/equipment-selection.component';
import { RentValidationComponent } from './components/services/rental/rent-validation/rent-validation.component';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { OffersComponent } from './components/dashboard/offers/offers.component';
import { ReservationsComponent } from './components/dashboard/reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    MembersComponent,
    LoaderComponent,
    EquipmentFamilyComponent,
    EquipmentsComponent,
    ServicesComponent,
    CardComponent,
    RentalComponent,
    CalendarComponent,
    EquipmentSelectionComponent,
    RentValidationComponent,
    OrdersComponent,
    OffersComponent,
    ReservationsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
