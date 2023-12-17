import { Component, OnInit } from '@angular/core';
import {Competition} from "../../../core/models/ICompetition";
import {CompetitionService} from "../../../core/services/CompetitionService";
import {Response} from "../../../core/models/Response";
import {HttpResponse} from "@angular/common/http";
import {Member} from "../../../core/models/Member";

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

  constructor(private competitionService : CompetitionService) { }

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

    compareToCurrentDate(date : string , startTime : string, endTime : string) : string {
        let starDateTimeToCompare = new Date(date + " " + startTime)
        let endDateTimeToCompare = new Date(date + " " + endTime)
        if(endDateTimeToCompare < this.currentDate){
            return "Passed"
        }else if(starDateTimeToCompare <= this.currentDate &&  this.currentDate <= endDateTimeToCompare) {
            return "Active"
        }else {
            return "Coming soon"
        }
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
}
