import {Component, Input, OnInit} from '@angular/core';
import {RentProgressStateService} from "../rentProgressState.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(protected rentProgressState : RentProgressStateService) { }

  ngOnInit(): void {
  }

}
