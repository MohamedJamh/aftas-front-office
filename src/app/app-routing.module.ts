import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeComponent} from "./components/home/home.component";
import {UsersComponent} from "./components/dashboard/members/users.component";
import {LevelsComponent} from "./components/dashboard/levels/levels.component";
import {FishesComponent} from "./components/dashboard/fishes/fishes.component";
import {CompetitionsComponent} from "./components/dashboard/competitions/competitions.component";
import {HomeDashboardComponent} from "./components/dashboard/home-dashboard/home-dashboard.component";
import {AuthComponent} from "./components/auth/auth.component";
import {SiginComponent} from "./components/auth/signin/sigin.component";
import {AuthGuardGuard} from "./core/guards/auth-guard.guard";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {LoggedGuardGuard} from "./core/guards/logged-guard.guard";
import {ForbiddenComponent} from "./components/error/forbidden/forbidden.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    canActivateChild: [AuthGuardGuard],
    children: [
      {path: '', component: HomeDashboardComponent},
      {path: 'members', component: UsersComponent},
      {path: 'levels', component: LevelsComponent},
      {path: 'fishes', component: FishesComponent},
      {path: 'competitions', component: CompetitionsComponent}
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoggedGuardGuard],
    canActivateChild: [LoggedGuardGuard],
    children:[
      {path: '', component: SiginComponent},
      {path: 'sign-up', component: SignupComponent}
    ]
  },
  { path: 'error', component: ForbiddenComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
