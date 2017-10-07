import { Component, OnInit } from '@angular/core';

import { Choice } from './choice';
import { ChoiceService } from './choice.service';

@Component({
  selector: 'living',
  templateUrl: './living.component.html',
})
export class LivingComponent implements OnInit {
	choices: Choice[] = [];

	constructor(private choiceService: ChoiceService) { }

	ngOnInit(): void {
		this.choiceService.getLiving()
		  .then(choices => this.choices = choices);
	}
}