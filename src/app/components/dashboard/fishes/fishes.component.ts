import { Component, OnInit } from '@angular/core';
import {Level} from "../../../core/models/ILevel";
import {LevelService} from "../../../core/services/LevelService";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Fish} from "../../../core/models/Ifish";
import {FishService} from "../../../core/services/FishService";

@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css']
})
export class FishesComponent implements OnInit {
  fishes : Fish[] = [];
  levels : Level[] = [];
  newFish  : Fish = new Fish();

  constructor(private fishService : FishService, private levelsServices : LevelService) { }

  ngOnInit(): void {
    this.fishService.getAllFishes()
        .subscribe((response : HttpResponse<Response<Fish[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.fishes = response.body.result;
          }
        })
    this.levelsServices.getAllLevels()
        .subscribe((response : HttpResponse<Response<Level[]>>) => {
          if( [200].includes(response.status) && response.body?.result){
            this.levels = response.body.result;
          }
        })
  }


  trackFish(index : number, fish : Fish) {
    return fish.id!;
  }

  addFish() {
      this.fishService.addEquipment(this.newFish).subscribe((response : HttpResponse<Response<Fish>>) => {
          if( [200,201].includes(response.status) && response.body?.result){
              this.fishes.push(response.body.result);
              alert(response.body.message)
          }
      });
  }

}
