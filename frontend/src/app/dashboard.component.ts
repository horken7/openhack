import { Component, OnInit } from '@angular/core';

import { Choice } from './choice';
import { ChoiceService } from './choice.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html' 
})
export class DashboardComponent implements OnInit {

  choices: Choice[] = [];

  constructor(private choiceService: ChoiceService) { }

  ngOnInit(): void {
  	console.log(this.choiceService.getChoices()); 
    this.choiceService.getChoices()
      .then(choices => this.choices = choices);
  }
}
