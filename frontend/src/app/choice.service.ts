import { Choice } from './choice';
import { CHOICES } from './mock-choices';
import { Injectable } from '@angular/core';

@Injectable()
export class ChoiceService {
  getChoices(): Promise<Choice[]> {
    return Promise.resolve(CHOICES);
  }
}