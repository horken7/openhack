import { Choice } from './choice';
import { CHOICES, LIVING, WORK } from './mock-choices';
import { Injectable } from '@angular/core';

@Injectable()
export class ChoiceService {
  getChoices(): Promise<Choice[]> {
    return Promise.resolve(CHOICES);
  }

  getLiving(): Promise<Choice[]> {
    return Promise.resolve(LIVING);
  }

  getWork(): Promise<Choice[]> {
    return Promise.resolve(WORK);
  }
}