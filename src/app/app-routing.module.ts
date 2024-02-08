import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeComponent} from "./components/home/home.component";
import {MembersComponent} from "./components/dashboard/members/members.component";
import {LevelsComponent} from "./components/dashboard/levels/levels.component";
import {FishesComponent} from "./components/dashboard/fishes/fishes.component";
import {CompetitionsComponent} from "./components/dashboard/competitions/competitions.component";
import {HomeDashboardComponent} from "./components/dashboard/home-dashboard/home-dashboard.component";
import {AuthComponent} from "./components/auth/auth.component";
import {SiginComponent} from "./components/auth/signin/sigin.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: HomeDashboardComponent},
      {path: 'members', component: MembersComponent},
      {path: 'levels', component: LevelsComponent},
      {path: 'fishes', component: FishesComponent},
      {path: 'competitions', component: CompetitionsComponent}
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children:[
      {path: '', component: SiginComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
