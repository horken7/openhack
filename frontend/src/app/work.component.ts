import { Component, OnInit } from '@angular/core';

import { Choice } from './choice';
import { ChoiceService } from './choice.service';

@Component({
  selector: 'work',
  templateUrl: './work.component.html',
})
export class WorkComponent implements OnInit {
	choices: Choice[] = [];

	constructor(private choiceService: ChoiceService) { }

	ngOnInit(): void {
		this.choiceService.getWork()
		  .then(choices => this.choices = choices);
	}
}