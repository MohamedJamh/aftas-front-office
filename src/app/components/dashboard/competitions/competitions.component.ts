import { Component, OnInit } from '@angular/core';
import {Competition} from "../../../core/models/ICompetition";
import {CompetitionService} from "../../../core/services/CompetitionService";
import {Response} from "../../../core/models/Response";
import {HttpResponse} from "@angular/common/http";
import {Member} from "../../../core/models/Member";
import {Rank} from "../../../core/models/Irank";
import {RankingService} from "../../../core/services/ranking-service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  competitions : Competition[] = [];
  newCompetition  : Competition = new Competition();
  currentDate : Date = new Date();
  competitionIdToEnroll : number = -1;
  memberCodeToEnroll: Member = new Member();
  competitionRankings: Rank[] = [];

  constructor(protected competitionService : CompetitionService,private rankingService : RankingService) { }

  ngOnInit(): void {
    this.competitionService.getAllCompetitions()
      .subscribe((response : HttpResponse<Response<Competition[]>>) => {
        if( [200].includes(response.status) && response.body?.result){
          this.competitions = response.body.result;
        }
      })
  }

  trackCompetition(index : number, competition : Competition) {
    return competition.id!;
  }

    addCompetition() {
        this.competitionService.createCompetition(this.newCompetition).subscribe((response : HttpResponse<Response<Competition>>) => {
            if( [200,201].includes(response.status) && response.body?.result){
                this.competitions.push(response.body.result);
                alert(response.body.message)
            }
        });
    }


    enrollInCompetition( ) {
        this.competitionService.competitionEnroll(this.competitionIdToEnroll, this.memberCodeToEnroll.id ?? -1).subscribe((response : HttpResponse<Response<null>>) => {
            if(response.body?.message){
                alert(response.body.message)
                window.location.reload();
            }
        });
    }

    prepareMemberEnroll(id: number ) {
        this.competitionIdToEnroll = id;
    }

  getRankings(competitionId : number) {
    this.rankingService.getRankings(competitionId).subscribe((response : HttpResponse<Response<Rank[]>>) => {
          if( [200,201].includes(response.status) && response.body?.result){
            this.competitionRankings = response.body.result;
          }else {
            this.competitionRankings = [];
          }
        }
    )
  }
}
