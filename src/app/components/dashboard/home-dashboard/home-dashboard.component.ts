import { Component, OnInit } from '@angular/core';
import {CompetitionService} from "../../../core/services/CompetitionService";
import {Competition} from "../../../core/models/ICompetition";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Rank} from "../../../core/models/Irank";
import {Fish} from "../../../core/models/Ifish";
import {Member} from "../../../core/models/Member";
import {FishService} from "../../../core/services/FishService";
import {HuntingService} from "../../../core/services/hunting-service";
import {RankingService} from "../../../core/services/ranking-service";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  currentDate : Date = new Date();
  upcomingCompetitions : Competition[] = [];
  competitionRealTimeScore: Rank[] = [];
  competitionMembers : Member[] = [];
  fishes : Fish[] = [];
  loading : boolean = true;
  newHunt : {
    memberId : number | null,
    competitionId : number | undefined,
    fish : Fish
  } = {
    memberId : null,
    competitionId : undefined,
    fish : new Fish()
  }
  competitionRankings: Rank[] = [];

  constructor(protected competitionService : CompetitionService,
              private fishService : FishService,
              private huntingService : HuntingService,
              private rankingService : RankingService
  ) { }

  ngOnInit(): void {
    this.competitionService.upcomingCompetitions().subscribe((response : HttpResponse<Response<Competition[]>>) => {
        if( [200].includes(response.status) && response.body?.result){
          this.upcomingCompetitions = response.body.result;
          this.loading = false;
          if( ! this.noCompetitionToday()){
            this.refreshScore()
            this.newHunt.competitionId = this.upcomingCompetitions[0].id
            this.getCompetitionMembers()
            this.getFishes()
          }
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

  refreshScore() {
    this.competitionService.competitionRealTimeScore(this.upcomingCompetitions[0].id!).subscribe((response : HttpResponse<Response<Rank[]>>) => {
      if( [200].includes(response.status) && response.body?.result){
        this.competitionRealTimeScore = response.body.result;
      }
    })
  }

  private getCompetitionMembers() {
    this.competitionService.getCompetitionMembers(this.upcomingCompetitions[0].id!).subscribe((response : HttpResponse<Response<Member[]>>) => {
      if( [200].includes(response.status) && response.body?.result){
        this.competitionMembers = response.body.result;
      }
    })
  }

  private getFishes() {
    this.fishService.getAllFishes().subscribe((response : HttpResponse<Response<Fish[]>>) => {
      if( [200].includes(response.status) && response.body?.result){
        this.fishes = response.body.result;
      }
    })
  }

  addHunt() {
    this.huntingService.registerHunt(this.newHunt).subscribe((response : HttpResponse<Response<any>>) => {
      if( [200,201].includes(response.status) && response.body?.result){
        alert(response.body.message)
        this.refreshScore()
      }
    })
  }

  getRankings() {
    this.rankingService.getRankings(this.upcomingCompetitions[0].id!).subscribe((response : HttpResponse<Response<Rank[]>>) => {
      if( [200].includes(response.status) && response.body?.result){
        this.competitionRankings = response.body.result;
      }
    })
  }
}
