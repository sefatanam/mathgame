import {AbstractControl} from '@angular/forms';

export class EquationValidator {
  // tslint:disable-next-line:typedef
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    return (form: AbstractControl): object => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];
      // tslint:disable-next-line:radix
      return firstNumber + secondNumber === parseInt(sum) ? null : {addition: true};
    };
  }
}
