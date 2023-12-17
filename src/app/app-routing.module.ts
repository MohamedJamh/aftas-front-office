import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeComponent} from "./components/home/home.component";
import {MembersComponent} from "./components/dashboard/members/members.component";
import {LevelsComponent} from "./components/dashboard/levels/levels.component";
import {FishesComponent} from "./components/dashboard/fishes/fishes.component";
import {ServicesComponent} from "./components/services/services.component";
import {RentalComponent} from "./components/services/rental/rental.component";
import {CalendarComponent} from "./components/services/rental/calendar/calendar.component";
import {
  EquipmentSelectionComponent
} from "./components/services/rental/equipment-selection/equipment-selection.component";
import {RentValidationComponent} from "./components/services/rental/rent-validation/rent-validation.component";
import {OrdersComponent} from "./components/dashboard/orders/orders.component";
import {CompetitionsComponent} from "./components/dashboard/competitions/competitions.component";
import {ReservationsComponent} from "./components/dashboard/reservations/reservations.component";
import {HomeDashboardComponent} from "./components/dashboard/home-dashboard/home-dashboard.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'services',
    children: [
      {path: '', component: ServicesComponent},
      {
        path: 'rental',
        component: RentalComponent,
        children:[
          {path: '', component: CalendarComponent},
          {path: 'equipment-selection', component: EquipmentSelectionComponent},
          {path: 'rent-validation', component: RentValidationComponent}
        ]
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: HomeDashboardComponent},
      {path: 'members', component: MembersComponent},
      {path: 'levels', component: LevelsComponent},
      {path: 'fishes', component: FishesComponent},
      {path: 'competitions', component: CompetitionsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'reservation', component: ReservationsComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
