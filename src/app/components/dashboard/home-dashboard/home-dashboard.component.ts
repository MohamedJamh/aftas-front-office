import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../../../core/services/CompetitionService";
import {Competition} from "../../../core/models/ICompetition";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Rank} from "../../../core/models/Irank";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  currentDate : Date = new Date();
  upcomingCompetitions : Competition[] = [];
  competitionRealTimeScore: Rank[] = [];
  loading : boolean = true;

  constructor(protected competitionService : CompetitionService) { }

  ngOnInit(): void {
    this.competitionService.upcomingCompetitions().subscribe((response : HttpResponse<Response<Competition[]>>) => {
        if( [200].includes(response.status) && response.body?.result){
          this.upcomingCompetitions = response.body.result;
          this.loading = false;
        }
      }
    )
  }

  noCompetitionToday() : boolean {
    if(this.upcomingCompetitions.length == 0) return true;
    let closestCompetitionDate = new Date(this.upcomingCompetitions[0].date!)
    return closestCompetitionDate.toLocaleDateString() != this.currentDate.toLocaleDateString()
  }

  getClosestCompetitionDifferenceDays() : string {
    if(this.upcomingCompetitions.length == 0) return "Who knows? :/"
    let competitionDateToCompare = new Date(this.upcomingCompetitions[0].date!)
    let difference = competitionDateToCompare.getTime() - this.currentDate.getTime()
    return Math.ceil(difference / (1000 * 3600 * 24)) + " Day(s)";
  }

    isLoading() {
        return this.loading;
    }
}
