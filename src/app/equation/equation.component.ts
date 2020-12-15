import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EquationValidator} from '../custom/equation-validator';
import {delay, filter, scan} from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  totalAnswered = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [EquationValidator.addition('answer', 'a', 'b')]);

  constructor() {
  }

  get a(): number {
    return this.mathForm.value.a;
  }

  get b(): number {
    return this.mathForm.value.b;
  }

  ngOnInit(): void {

    // ::: BEST APPROACH
    this.mathForm.statusChanges.pipe(
      filter((value) => value === 'VALID'),
      delay(130),
      scan((acc, value) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        };
      }, {numberSolved: 0, startTime: new Date()}))

      .subscribe(({numberSolved, startTime}) => {
        this.totalAnswered = numberSolved;
        this.secondsPerSolution = ((new Date().getTime() - startTime.getTime()) / numberSolved / 1000);
        this.mathForm.patchValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}
