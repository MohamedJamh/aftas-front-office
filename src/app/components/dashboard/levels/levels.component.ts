import { Component, OnInit } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {LevelService} from "../../../core/services/LevelService";
import {Level} from "../../../core/models/ILevel";
import {Action} from "rxjs/internal/scheduler/Action";


@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  levels : Level[] = [];
  newLevel  : Level = new Level();

  constructor(private levelService : LevelService) {}

  ngOnInit(): void {
    this.levelService.getAllLevels()
        .subscribe((response : HttpResponse<Response<Level[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.levels = response.body.result;
          }
        })
  }

  addLevel() {
    this.levelService.addLevel(this.newLevel).subscribe((response : HttpResponse<Response<Level>>) => {
      if( [200,201].includes(response.status) && response.body?.result){
        this.levels.push(response.body.result);
        alert(response.body.message)
      }
    });
  }

}
