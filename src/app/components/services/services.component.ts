import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  ourServices: any[] = [
      {
        title :'Construct Equipment Rental',
        description : 'We have a wide range of construction equipment for rent. We have the',
        link : 'rental'
      }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
