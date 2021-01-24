import { Component, OnInit } from '@angular/core';

interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [
    { value: 'crunches', viewValue: 'Chrunches' },
    { value: 'touch-toes', viewValue: 'Touch toes' },
    { value: 'side-lunges', viewValue: 'Side lunges' },
    { value: 'burpees', viewValue: 'Burpees' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
